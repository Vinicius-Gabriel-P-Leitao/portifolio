import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { SelectProps } from './select.type'
import { itemVariants, selectVariants } from './select.variants'

export function Select({ variant, values, value, onChange, className, icon, hasIcon }: SelectProps) {
  const [open, setOpen] = useState(false)

  const selected = values.find((it) => it.value === value)

  return (
    <div className={'relative'}>
      <button
        type='button'
        onClick={() => setOpen((open) => !open)}
        className={selectVariants({ variant, active: open || !!selected, hasIcon, className })}
      >
        <div className='flex items-center gap-2 pb-1'>
          {icon && <span className='text-zinc-500'>{icon}</span>}

          <span>{selected?.label ?? 'SELECT'}</span>
          <ChevronDown className='h-3 w-3' />
        </div>
      </button>

      {open && (
        <div className='absolute left-0 mt-3 flex flex-col gap-3' role='listbox'>
          {values.map((it) => (
            <button
              type='button'
              role='option'
              key={it.value}
              aria-selected={it.value === value}
              className={itemVariants({ active: it.value === value })}
              onClick={() => {
                onChange?.(it.value)
                setOpen(false)
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
