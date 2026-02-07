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
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Field,
} from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const AddSnippetDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Snippet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Snippet Management</DialogTitle>
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

const AddSnippetForm = () => {
  return (
    <FieldSet>
      <FieldLegend>Add New Snippet</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title: </FieldLabel>
          <Input id="title" type="text" placeholder="Snippet title" />
        </Field>
        <Field>
          <FieldLabel htmlFor="code">Your code: </FieldLabel>
          <Textarea id="code" placeholder="Paste your code snippet" />
        </Field>
        <p>select</p>
        <p>select</p>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            placeholder="Your code description..."
            rows={4}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
