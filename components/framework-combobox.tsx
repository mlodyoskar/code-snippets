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

const FrameworkCombobox = () => {
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <Field className="w-full">
      <FieldLabel htmlFor="framework">Frameworks</FieldLabel>
      <Combobox items={FRAMEWORKS} value={value} onValueChange={setValue}>
        <ComboboxInput
          placeholder="Select a framework"
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
    </Field>
  )
}

export default FrameworkCombobox
