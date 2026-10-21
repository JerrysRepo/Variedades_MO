import type { ReactNode } from 'react';

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'light';
};

export function ButtonLink({
  children,
  className = '',
  href,
  variant = 'primary',
}: ButtonLinkProps) {
  const external = href.startsWith('https://');

  return (
    <a
      className={`button-link button-link--${variant} ${className}`.trim()}
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}
