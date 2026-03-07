import Onboard from "@/components/onboard";
import { getRecentSnippets, getSnippetStats } from "@/lib/queries";

export default async function Page(){
  const recent = await getRecentSnippets();
  const stats = await getSnippetStats();
  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-6 lg:p-8">
      <Onboard />
    </div>
  );
}


