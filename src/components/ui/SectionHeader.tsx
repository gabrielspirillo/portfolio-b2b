import { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-silver-200 ${className}`}>
      <span className="text-ember-500 font-semibold">{"//"}</span>
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  className = "",
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16 ${className}`}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[2rem] leading-[1.05] md:text-5xl font-semibold tracking-[-0.035em] text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}
