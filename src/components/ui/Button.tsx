import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
}

export function ButtonLink({ variant = 'primary', icon, children, className = '', ...rest }: Props) {
  const external = rest.href?.startsWith('http')
  const base =
    'group relative inline-flex items-center gap-3 text-sm font-medium transition-[color,background,transform] duration-300 active:scale-[0.97]'
  const styles =
    variant === 'primary'
      ? 'overflow-hidden rounded-[3px] bg-fg px-5 py-3 text-ink hover:text-fg'
      : 'link-line py-3 text-fg'

  return (
    <a
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </a>
  )
}
