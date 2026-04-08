import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { useAudio } from '@/lib/audio';

type ButtonBaseProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: never };
type ButtonAsAnchor = ButtonBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ children, icon, className = "", href, ...props }: ButtonProps) {
  const { playEarcon } = useAudio();

  const handleMouseEnter = (e: React.MouseEvent) => {
    playEarcon();
    if (props.onMouseEnter) props.onMouseEnter(e as any);
  };

  const hasIcon = !!icon;

  const baseStyles = `
    group relative inline-flex items-center justify-between gap-5 
    ${hasIcon ? 'px-8 py-4' : 'pl-6 pr-2 py-2'} rounded-full overflow-hidden
    bg-white border border-carbon-200/50
    shadow-[0_4px_20px_rgba(0,0,0,0.03)]
    transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
    ${className}
  `;

  const innerContent = (
    <>
      <span className="absolute inset-[-1px] rounded-full bg-carbon-950 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
      
      <span className="relative z-10 flex items-center gap-3 text-carbon-950 font-medium tracking-wide group-hover:text-white transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap">
        {hasIcon && (
          <span className="flex items-center justify-center">
            {icon}
          </span>
        )}
        {children}
      </span>

      {!hasIcon && (
        <span className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#e5e5e5] group-hover:bg-white transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-5 h-5 text-carbon-950 transform transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180"
          >
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      )}
    </>
  );

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a 
        href={href} 
        onMouseEnter={handleMouseEnter}
        className={baseStyles} 
        {...anchorProps}
      >
        {innerContent}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button 
      onMouseEnter={handleMouseEnter}
      className={baseStyles} 
      {...buttonProps}
    >
      {innerContent}
    </button>
  );
}
