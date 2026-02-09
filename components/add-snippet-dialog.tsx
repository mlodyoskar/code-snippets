'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import {
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Field,
} from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './ui/combobox'

const AddSnippetDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Snippet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Snippet Management</DialogTitle>
          <DialogDescription className="sr-only">
            Add your snippets, press add when you are done.
          </DialogDescription>
        </DialogHeader>
        <AddSnippetForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddSnippetDialog
function onSubmit() {
  console.log('#TODO')
}

const AddSnippetForm = () => {
  const languages = ['Javascript', 'C#', 'C++']
  const frameworks = ['Next.js', 'Angular', 'Nuxt.js']

  return (
    <form onSubmit={onSubmit}>
      <FieldSet>
        <FieldLegend>Add New Snippet</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title </FieldLabel>
            <Input id="title" type="text" placeholder="Snippet title" />
          </Field>
          <Field>
            <FieldLabel htmlFor="code">Your code </FieldLabel>
            <Textarea id="code" placeholder="Paste your code snippet" />
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="language">Language</FieldLabel>
            <Combobox items={languages}>
              <ComboboxInput placeholder="Select a language" />
              <ComboboxContent>
                <ComboboxEmpty>No languages found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="framework">Frameworks</FieldLabel>
            <Combobox items={frameworks}>
              <ComboboxInput placeholder="Select a framework" />
              <ComboboxContent>
                <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Your code description..."
              rows={4}
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Add</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
