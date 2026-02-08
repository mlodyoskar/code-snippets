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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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

const AddSnippetForm = () => {
  return (
    <form>
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item">Item</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="framework">Framework</FieldLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item">Item</SelectItem>
              </SelectContent>
            </Select>
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
