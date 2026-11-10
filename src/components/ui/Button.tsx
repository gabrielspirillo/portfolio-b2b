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

// Same motion language as the original buttons: a fill that grows in from the
// centre, colour swap on the label and a knob whose "+" spins 180°.
const VARIANTS: Record<Variant, { shell: string; fill: string; text: string; knob: string; icon: string }> = {
  ember: {
    shell: "glass-ember",
    fill: "bg-carbon-950",
    text: "text-white",
    knob: "bg-white group-hover:bg-ember-500",
    icon: "text-ember-600 group-hover:text-white",
  },
  light: {
    shell: "bg-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.55)]",
    fill: "bg-carbon-950",
    text: "text-carbon-950 group-hover:text-white",
    knob: "bg-ember-500 group-hover:bg-white",
    icon: "text-white group-hover:text-ember-600",
  },
  glass: {
    shell: "glass-blur",
    fill: "bg-ember-500",
    text: "text-white",
    knob: "bg-white/10 group-hover:bg-white",
    icon: "text-white group-hover:text-ember-600",
  },
};

export function Button({ children, icon, variant = "ember", className = "", href, onMouseEnter, ...props }: ButtonProps) {
  const { playEarcon } = useAudio();
  const v = VARIANTS[variant];

  const classes = `group relative inline-flex items-center gap-4 rounded-full pl-6 pr-1.5 py-1.5 overflow-hidden ${v.shell} ${className}`;

  const inner = (
    <>
      <span className={`absolute inset-0 rounded-full ${v.fill} scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ${EASE} z-[2]`} />
      <span className={`relative z-10 flex items-center gap-2.5 font-medium tracking-tight whitespace-nowrap transition-colors duration-500 ${EASE} ${v.text}`}>
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {children}
      </span>
      <span className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${EASE} ${v.knob}`}>
        <svg viewBox="0 0 24 24" fill="none" className={`w-[18px] h-[18px] transition-[transform,color] duration-[600ms] ${EASE} group-hover:rotate-180 ${v.icon}`}>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
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
