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
    <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center">
      <p className="text-lg font-medium">{title}</p>
      <Button asChild className="mt-5">
        <Link href={href}>{action}</Link>
      </Button>
    </div>
  );
}
