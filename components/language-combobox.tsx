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

const LanguageCombobox = ({ name }: { name?: string }) => {
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <Field className="w-full">
      <FieldLabel htmlFor="language">Language</FieldLabel>
      <Combobox items={LANGUAGES} value={value} onValueChange={setValue}>
        <ComboboxInput
          placeholder="Select a language"
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
    <input type="hidden" name={name} value={value || ''} />
    </Field>
  )
}

export default LanguageCombobox
