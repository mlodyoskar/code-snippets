'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SaveIcon, XIcon, Loader2 } from 'lucide-react'
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
  FieldError,
} from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import LanguageCombobox from './language-combobox'
import FrameworkCombobox from './framework-combobox'
import { createSnippetAction } from '@/app/actions'
import { Snippet } from '@/db/schema'

const initialState = {
  success: false,
  message: '',
  errors: {},
}

const AddSnippetDialog = ({
  editMode = false,
  snippet,
}: {
  editMode?: boolean
  snippet?: Snippet
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={editMode ? 'outline' : 'default'}>
          {editMode ? 'Edit Snippet' : 'Add Snippet'}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-foreground sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Snippet Management</DialogTitle>
          <DialogDescription className="sr-only">
            {editMode
              ? 'Edit your snippet'
              : 'Add your snippet, press add when you are done.'}
          </DialogDescription>
        </DialogHeader>
        <AddSnippetForm setOpen={setOpen} snippet={snippet} />
      </DialogContent>
    </Dialog>
  )
}

export default AddSnippetDialog

const AddSnippetForm = ({
  setOpen,
  snippet,
}: {
  setOpen: (open: boolean) => void
  snippet?: Snippet
}) => {
  const router = useRouter()
  const [state, action, isPending] = useActionState(
    createSnippetAction,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      setOpen(false)
      toast.success(state.message)
      if (state.snippetId) {
        router.push(`/s/${state.snippetId}`)
      }
    } else if (state.message && !state.success && state.message !== '') {
      toast.error(state.message)
    }
  }, [state, setOpen, router])

  return (
    <form action={action}>
      <FieldSet>
        <FieldLegend>
          {snippet ? 'Edit Snippet' : 'Add New Snippet'}
        </FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Snippet title"
              disabled={isPending}
              defaultValue={snippet?.title}
            />
            {state.errors?.title && (
              <FieldError>{state.errors.title[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="code">Your code</FieldLabel>
            <Textarea
              id="code"
              name="code"
              placeholder="Paste your code snippet"
              className="max-h-[400px] min-h-[200px] overflow-auto font-mono whitespace-pre"
              disabled={isPending}
              defaultValue={snippet?.code}
            />
            {state.errors?.code && (
              <FieldError>{state.errors.code[0]}</FieldError>
            )}
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <LanguageCombobox
                name="language"
                defaultValue={snippet?.language}
              />
              {state.errors?.language && (
                <FieldError className="mt-2">
                  {state.errors.language[0]}
                </FieldError>
              )}
            </div>
            <div>
              <FrameworkCombobox
                name="framework"
                defaultValue={snippet?.framework}
              />
              {state.errors?.framework && (
                <FieldError className="mt-2">
                  {state.errors.framework[0]}
                </FieldError>
              )}
            </div>
          </div>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Your code description..."
              rows={4}
              disabled={isPending}
              defaultValue={snippet?.description ?? ''}
            />
            {state.errors?.description && (
              <FieldError>{state.errors.description[0]}</FieldError>
            )}
          </Field>

          <Field orientation="horizontal" className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
              <XIcon className="w-3" />
            </Button>
            <Button
              type="submit"
              className="bg-chart-3 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  Saving...
                  <Loader2 className="w-3 animate-spin" />
                </>
              ) : (
                <>
                  Save
                  <SaveIcon className="w-3" />
                </>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
