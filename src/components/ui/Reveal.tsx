import { motion, type HTMLMotionProps } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number; as?: 'div' | 'li' }

/** Fades and lifts its children in once they enter the viewport. */
export function Reveal({ delay = 0, y = 28, as = 'div', children, ...rest }: RevealProps) {
  const C = (as === 'li' ? motion.li : motion.div) as typeof motion.div
  return (
    <C
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </C>
  )
}

type SplitProps = {
  text: string
  className?: string
  /** Words from this index on are rendered muted. */
  mutedFrom?: number
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
  /** Animate on mount instead of on scroll. */
  immediate?: boolean
  id?: string
}

/** Word-by-word masked rise. Text stays fully readable to assistive tech. */
export function SplitText({ text, className, mutedFrom, delay = 0, as = 'h2', immediate, id }: SplitProps) {
  const Tag = motion[as]
  const words = text.split(' ')
  const trigger = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <Tag
      // Remount when the text changes (e.g. language switch) so the reveal replays cleanly.
      key={text}
      id={id}
      className={className}
      {...trigger}
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${mutedFrom !== undefined && i >= mutedFrom ? 'text-muted' : ''}`}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
