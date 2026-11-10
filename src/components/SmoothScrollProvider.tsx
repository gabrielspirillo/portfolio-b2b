"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Native scrolling (runs on the compositor thread, never blocks on JS) +
 * CSS smooth scrolling for in-page anchors. Also pauses every autoplay
 * video while it is off-screen so decoding doesn't steal frames.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) root.style.scrollBehavior = "smooth";

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { rootMargin: "200px" }
    );
    const watched = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll("video:not([data-manual])").forEach((v) => {
        if (!watched.has(v)) {
          watched.add(v);
          io.observe(v);
        }
      });
    scan();

    // Pause decorative CSS motion of sections that are off-screen
    const animIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.setAttribute("data-paused", String(!e.isIntersecting))),
      { rootMargin: "100px" }
    );
    document.querySelectorAll("[data-anim]").forEach((el) => animIo.observe(el));

    // Lite devices: pause the background light pulses while the page is
    // scrolling, so the GPU only has to move content (less heat, steadier fps)
    let scrollTimer = 0;
    const onScroll = () => {
      if (!root.classList.contains("lite")) return;
      root.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => root.classList.remove("is-scrolling"), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      root.style.scrollBehavior = "";
      io.disconnect();
      animIo.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
      mo.disconnect();
    };
  }, []);

  return <>{children}</>;
}
