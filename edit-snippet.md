# Implementing Edit Snippet Functionality

To adapt your existing `AddSnippetDialog` component to handle editing snippets, you'll need to modify it to accept optional existing snippet data and update its fields and state management accordingly. 

Here is a step-by-step conceptual guide on what you need to change:

## 1. Accept Initial Data via Props

Modify the `AddSnippetDialog` and its internal `AddSnippetForm` to accept an optional prop, such as `snippet`. This prop would contain the existing snippet data (e.g., `id`, `title`, `code`, `language`, `framework`, `description`) if you are editing an existing snippet.

## 2. Dynamic UI Text

Update the text throughout the dialog and form to reflect whether the user is adding or editing:
- **Button / Trigger**: "Add Snippet" vs. "Edit Snippet" (or an edit icon).
- **Dialog Title**:  "Add Snippet" vs. "Edit Snippet".
- **Submit Button**: "Save" vs. "Update Snippet".

## 3. Pre-populate Form Fields

When the `snippet` prop is provided, you need to pre-fill the form fields with the existing data.
- For standard inputs (`title`, `code`, `description`), you can pass the existing values as the `defaultValue` prop.
- For the `LanguageCombobox` and `FrameworkCombobox`, you'll likely need to pass the existing selected values down to these components so they appear correctly selected when the dialog opens.

## 4. Handle Snippet ID and Server Action

When editing, the server action needs to know *which* snippet it is updating.
- **Hidden Input**: You can render a hidden input field that contains the `snippet.id`. If this `id` exists in the `formData` sent to the server action, the action knows it's an update operation.
- **Server Action Logic**: You have two choices here:
  1. Use your existing `createSnippetAction` and modify it upstream to perform an "upsert" (update if `id` exists, insert if it doesn't).
  2. Create a separate `updateSnippetAction` and conditionally pass it into the `useActionState` hook depending on whether the `snippet` prop is present. The second approach is often cleaner as it separates creation and modification concerns.

## 5. Opening the Dialog Remotely (Optional)

If your edit button is outside of the dialog definition (e.g., on a snippet detail page or a snippet list card), you might want to control the `open` state of the dialog from a parent component rather than keeping it entirely local to the dialog component. You can lift the `open` state up to the parent and pass it down as props, or simply render the `AddSnippetDialog` at the location where the edit button lives.

## Summary Checklist

- Add a `snippet` prop to the dialog and form components.
- Use `defaultValue` on inputs and textarea fields using the `snippet` data.
- Pass initial values to the `LanguageCombobox` and `FrameworkCombobox`.
- Include a hidden input for the `snippet.id`.
- Implement dynamic labels ("Edit Snippet" instead of "Add Snippet").
- Handle the submission payload in the newly adjusted or separated server action to perform an SQL `UPDATE` instead of an `INSERT`.
