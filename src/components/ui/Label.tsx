type LabelProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export function Label({ children, className = "", centered = false }: LabelProps) {
  if (centered) {
    return (
      <div className={`flex items-center justify-center gap-5 ${className}`}>
        <span className="hidden h-px w-10 bg-accent/40 sm:block" aria-hidden="true" />
        <span className="label-luxury">{children}</span>
        <span className="hidden h-px w-10 bg-accent/40 sm:block" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="label-luxury shrink-0">{children}</span>
      <span className="section-label-line" aria-hidden="true" />
    </div>
  );
}
