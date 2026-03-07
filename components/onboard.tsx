import AddSnippetDialog from "./add-snippet-dialog";
import AccordionOnboard from "./onboard-acordion";
import { Separator } from "./ui/separator";

export default function Onboard() {
  return (
    <section className="flex flex-col border-2 border-input p-6 rounded-xl">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight my-2">Welcome to Code Snippets</h1>
            <p className="text-muted-foreground">Code Snippets is a place where you can store your code snippets and share them with others.</p>
            <div className="my-4 w-40">
                <AddSnippetDialog className="w-full font-bold"/>
            </div>
        </div>
        <Separator />
        <div>
            <AccordionOnboard />
        </div>
    </section>
  )
}
