import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { useAudio } from "@/lib/audio";

type Variant = "ember" | "glass" | "light";

type ButtonBaseProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: never };
type ButtonAsAnchor = ButtonBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

// Hover: the surface lifts and brightens, a soft light sweeps across once,
// and the knob's arrow slides out while a new one slides in.
const VARIANTS: Record<Variant, { shell: string; tint: string; sheen: string; text: string; knob: string; icon: string }> = {
  ember: {
    shell: "glass-ember hover:shadow-[inset_0_1px_0_rgba(255,242,232,0.85),inset_0_0_0_1px_rgba(255,214,190,0.2),inset_0_-16px_32px_-16px_rgba(105,22,0,0.5),0_16px_40px_-12px_rgba(255,90,31,0.85)]",
    tint: "group-hover:bg-white/[0.08]",
    sheen: "via-white/50",
    text: "text-white",
    knob: "bg-white",
    icon: "text-ember-600",
  },
  light: {
    shell: "bg-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.55)]",
    tint: "group-hover:bg-ember-500/[0.05]",
    sheen: "via-ember-500/15",
    text: "text-carbon-950",
    knob: "bg-ember-500",
    icon: "text-white",
  },
  glass: {
    shell: "glass-blur",
    tint: "group-hover:bg-white/[0.06]",
    sheen: "via-white/20",
    text: "text-white",
    knob: "bg-white/10 group-hover:bg-white/15",
    icon: "text-white",
  },
};

function Arrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`absolute w-[18px] h-[18px] ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({ children, icon, variant = "ember", className = "", href, onMouseEnter, ...props }: ButtonProps) {
  const { playEarcon } = useAudio();
  const v = VARIANTS[variant];

  const classes = `group relative inline-flex items-center gap-4 rounded-full pl-6 pr-1.5 py-1.5 overflow-hidden transition-[transform,box-shadow] duration-500 ${EASE} hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${v.shell} ${className}`;

  const inner = (
    <>
      <span aria-hidden="true" className={`absolute inset-0 rounded-full z-[2] pointer-events-none transition-colors duration-500 ${EASE} ${v.tint}`} />
      <span aria-hidden="true" className="absolute inset-0 rounded-full overflow-hidden z-[3] pointer-events-none">
        <span className={`absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent ${v.sheen} to-transparent -translate-x-full duration-0 group-hover:translate-x-[400%] group-hover:duration-[1000ms] transition-transform ease-[cubic-bezier(0.45,0,0.2,1)]`} />
      </span>
      <span className={`relative z-10 flex items-center gap-2.5 font-medium tracking-tight whitespace-nowrap ${v.text}`}>
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {children}
      </span>
      <span className={`relative z-10 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-[transform,background-color] duration-500 ${EASE} group-hover:scale-[1.06] ${v.knob} ${v.icon}`}>
        <Arrow className={`transition-transform duration-500 ${EASE} group-hover:translate-x-[160%]`} />
        <Arrow className={`-translate-x-[160%] transition-transform duration-500 ${EASE} group-hover:translate-x-0`} />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onMouseEnter={(e) => {
          playEarcon();
          (onMouseEnter as React.MouseEventHandler<HTMLAnchorElement> | undefined)?.(e);
        }}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onMouseEnter={(e) => {
        playEarcon();
        (onMouseEnter as React.MouseEventHandler<HTMLButtonElement> | undefined)?.(e);
      }}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
}
