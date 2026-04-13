import { Button } from '@ui/components/button/button.component'
import { Select } from '@ui/components/select/select.component'
import type { SelectValue } from '@ui/components/select/select.type'
import type { SectionI18n } from '@ui/types'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useEffect, useMemo, useState, type FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import type { OverlayProps } from './domain/overlay.object.type'

// Lazy loading dos módulos
const HomeComponent = lazy(() => import('../../modules/home/home.object.component'))
const AboutComponent = lazy(() => import('../../modules/about/about.object.component'))
const ProjectsComponent = lazy(() => import('../../modules/projects/projects.object.component'))
const ContactComponent = lazy(() => import('../../modules/contact/contact.object.component'))

// TODO: Tipar isso
export const Overlay: FC<OverlayProps> = ({ section, onNavigate }) => {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState<string>(i18n.language)

  const translationOptions = useMemo<SelectValue[]>(() => {
    return Object.keys(i18n.store.data).map((it) => ({
      label: it.toUpperCase(),
      value: it
    }))
  }, [i18n.store.data])

  useEffect(() => {
    if (value) {
      i18n.changeLanguage(value)
    }
  }, [value, i18n])

  return (
    <div className='absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4 md:p-10'>
      {/* Navigation */}
      <nav className='absolute top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-auto w-full max-w-7xl mx-auto'>
        <Button type='button' onClick={() => onNavigate('home')}>
          {t('site.name')}
        </Button>

        <div className='flex items-center gap-8 text-sm font-medium'>
          {(t('tabs', { returnObjects: true }) as SectionI18n[]).map((tab) => (
            <Button
              key={tab.id}
              type='button'
              onClick={() => onNavigate(tab.id)}
              active={section === tab.id}
              className='hover:text-white transition-colors duration-300'
            >
              {tab.label}
            </Button>
          ))}

          <Select
            values={translationOptions.map((opt) => ({
              ...opt,
              label: t(`languages.${opt.value}`)
            }))}
            value={value}
            onChange={setValue}
          />
        </div>
      </nav>

      <div className='w-full max-w-6xl pointer-events-auto'>
        <AnimatePresence mode='wait'>
          <Suspense
            fallback={
              <div className='text-white text-center py-20'>
                <Trans i18nKey={'loading'} />
              </div>
            }
          >
            {section === 'home' && <HomeComponent section={section} onNavigate={onNavigate} />}
            {section === 'about' && <AboutComponent />}
            {section === 'projects' && <ProjectsComponent />}
            {section === 'contact' && <ContactComponent />}
          </Suspense>
        </AnimatePresence>
      </div>
    </div>
  )
}
