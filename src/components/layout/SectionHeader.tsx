import { motion } from 'motion/react'
import { SplitText } from '../ui/Reveal'

type Props = {
  index: string
  label: string
  title?: string
  mutedFrom?: number
  className?: string
}

/** "[ 02 ] ── LABEL" identifier with an optional large split-word title. */
export function SectionHeader({ index, label, title, mutedFrom, className = '' }: Props) {
  return (
    <div className={className}>
      <div className="mono-label flex items-center gap-3">
        <span className="text-accent-2">[ {index} ]</span>
        <motion.span
          aria-hidden
          className="h-px w-10 origin-left bg-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <span>{label}</span>
      </div>
      {title && (
        <SplitText
          text={title}
          mutedFrom={mutedFrom}
          className="mt-6 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98] font-semibold"
          as="h2"
        />
      )}
    </div>
  )
}
