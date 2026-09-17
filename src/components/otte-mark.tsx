export function OtteMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
        <rect width="28" height="28" rx="6" fill="currentColor" />
        <path
          d="M7 9.2h3.1c2.7 0 4.4 1.6 4.4 4.8S12.8 18.8 10.1 18.8H7V9.2zm3 7.4c1.5 0 2.4-.9 2.4-2.6S11.5 11.4 10 11.4H9.1v5.2H10zM16.4 18.8V9.2h2.1v7.4H22V18.8h-5.6z"
          fill="var(--background)"
        />
      </svg>
    </span>
  );
}
