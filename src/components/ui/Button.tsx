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

const VARIANTS: Record<Variant, { shell: string; text: string; knob: string; arrow: string }> = {
  ember: { shell: "glass-ember", text: "text-white", knob: "bg-white", arrow: "text-ember-600" },
  glass: { shell: "glass-blur", text: "text-white", knob: "bg-white/10", arrow: "text-white" },
  light: { shell: "bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]", text: "text-carbon-950", knob: "bg-ember-500", arrow: "text-white" },
};

export function Button({ children, icon, variant = "ember", className = "", href, onMouseEnter, ...props }: ButtonProps) {
  const { playEarcon } = useAudio();
  const v = VARIANTS[variant];

  const classes = `group relative inline-flex items-center gap-4 rounded-full pl-6 pr-1.5 py-1.5 ${v.shell} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${className}`;

  const inner = (
    <>
      <span className={`relative z-10 flex items-center gap-2.5 font-medium tracking-tight whitespace-nowrap ${v.text}`}>
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {children}
      </span>
      <span className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${v.knob} shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]`}>
        <svg viewBox="0 0 24 24" fill="none" className={`w-[18px] h-[18px] ${v.arrow} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5`}>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
