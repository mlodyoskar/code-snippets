import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionOnboard() {
  return (
    <div className="flex justify-center">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-full"
      >
        <AccordionItem value="adding">
          <AccordionTrigger>How do I add a new snippet?</AccordionTrigger>
          <AccordionContent>
            Click the &quot;Add Snippet&quot; button in the top left corner or on the home page.
            Fill in a title, paste your code, select a language and optionally a framework and description.
            Once saved, the snippet will immediately appear in the list on the left.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="filtering">
          <AccordionTrigger>How do I search and filter snippets?</AccordionTrigger>
          <AccordionContent>
            Use the search field in the left panel to find a snippet by title.
            You can narrow down results by selecting a specific language (e.g. TypeScript, Python)
            or framework (e.g. React, Next.js). Active filters can be cleared in a single click.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="copying">
          <AccordionTrigger>How do I copy code from a snippet?</AccordionTrigger>
          <AccordionContent>
            Open a snippet by clicking on it in the left panel. On the detail page you&apos;ll find
            a copy button in the top right corner of the code block.
            Click it to copy the entire snippet to your clipboard, ready to paste into your editor.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
