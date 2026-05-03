export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-600",
    ghost: "border border-brand-200 text-brand hover:bg-brand-50",
    subtle: "bg-brand-50 text-brand hover:bg-brand-100",
  };

  return (
    <button
      className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
