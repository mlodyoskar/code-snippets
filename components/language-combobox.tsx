'use client'

import * as React from 'react'
import { LANGUAGES, type Language } from '@/lib/languages'
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
import { getLanguageIcon } from '@/lib/languages'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const LanguageCombobox = ({
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

  const currentParam = searchParams.get('lang')
  const [prevParam, setPrevParam] = React.useState(currentParam)

  const [value, setValue] = React.useState<string | null>(
    (updateUrl ? currentParam : defaultValue) || null
  )

  if (updateUrl && currentParam !== prevParam) {
    setPrevParam(currentParam)
    setValue(currentParam)
  }

  const handleSelect = (newValue: string | null) => {
    setValue(newValue)
    if (updateUrl) {
      const params = new URLSearchParams(searchParams)

      if (newValue) {
        params.set('lang', newValue)
      } else {
        params.delete('lang')
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <Field className="w-full">
      {!updateUrl && <FieldLabel htmlFor="language">Language</FieldLabel>}
      <Combobox items={LANGUAGES} value={value} onValueChange={handleSelect}>
        <ComboboxInput
          placeholder={updateUrl ? 'Language' : 'Select a language'}
          startSlot={
            value && (
              <Image
                src={getLanguageIcon(value as Language)}
                alt={value}
                width={16}
                height={16}
                className="size-4"
              />
            )
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                <Image
                  src={getLanguageIcon(item)}
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

export default LanguageCombobox
