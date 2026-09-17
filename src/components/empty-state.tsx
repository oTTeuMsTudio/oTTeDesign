import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  href,
  action,
}: {
  title: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mt-10 rounded-xl border border-white/8 bg-[#141414] p-12 text-center">
      <p className="text-lg font-medium">{title}</p>
      <Button asChild className="mt-5 bg-white text-black hover:bg-white/90">
        <Link href={href}>{action}</Link>
      </Button>
    </div>
  );
}
