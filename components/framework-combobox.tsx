'use client'

import * as React from 'react'
import { FRAMEWORKS, type Framework } from '@/lib/languages'
import { Field, FieldLabel } from './ui/field'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './ui/combobox'
import Image from 'next/image'
import { getFrameworkIcon } from '@/lib/languages'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const FrameworkCombobox = ({
  name,
  defaultValue,
  updateUrl,
}: {
  name?: string
  defaultValue?: string | null
  updateUrl?: boolean
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, setValue] = React.useState<string | null>(
    (updateUrl ? searchParams.get('framework') : defaultValue) || null
  )

  useEffect(() => {
    if (updateUrl && !searchParams.has('framework')) {
      setValue(null)
    }
  }, [searchParams, updateUrl])

  const handleSelect = (newValue: string | null) => {
    setValue(newValue)
    if (updateUrl) {
      const params = new URLSearchParams(searchParams)

      if (newValue) {
        params.set('framework', newValue)
      } else {
        params.delete('framework')
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <Field className="w-full">
      {!updateUrl && <FieldLabel htmlFor="framework">Frameworks</FieldLabel>}
      <Combobox items={FRAMEWORKS} value={value} onValueChange={handleSelect}>
        <ComboboxInput
          placeholder={updateUrl ? 'Framework' : 'Select a framework'}
          startSlot={
            value && (
              <Image
                src={getFrameworkIcon(value as Framework)}
                alt={value}
                width={16}
                height={16}
                className="size-4"
              />
            )
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                <Image
                  src={getFrameworkIcon(item)}
                  alt={item}
                  width={16}
                  height={16}
                  className="size-4"
                />
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {!updateUrl && <input type="hidden" name={name} value={value || ''} />}
    </Field>
  )
}

export default FrameworkCombobox
