import { SectionHeader } from '../layout/SectionHeader'
import { Reveal } from '../ui/Reveal'
import { ProjectCard } from './ProjectCard'
import { getProjects } from '../../data/projects'
import { useI18n } from '../../i18n/context'

export function ProjectGallery() {
  const { lang, t } = useI18n()
  const [featured, ...rest] = getProjects(lang)

  return (
    <section id="proyectos" aria-label={t.projects.label} className="relative border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeader
            index="01"
            label={t.projects.label}
            title={t.projects.title}
            mutedFrom={t.projects.mutedFrom}
            className="lg:col-span-7"
          />
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] leading-relaxed text-muted">{t.projects.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          <ProjectCard project={featured} featured />
        </div>

        {/* Asymmetric pair: second card drops lower to break the grid rhythm. */}
        <div className="mt-24 grid gap-24 md:mt-32 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
          {rest.map((p, i) => (
            <div key={p.id} className={i === 0 ? 'md:col-span-6 lg:col-span-5' : 'md:col-span-6 md:mt-40 lg:col-span-6 lg:col-start-7'}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
