import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function EmptyButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "w-full py-2 px-4 bg border-[#FE2A5C] border-2 h-10 items-center text-[#FE2A5C] rounded-md bg-slate-50 text-sm font-medium transition-colors hover:bg-[#FE2A5C] hover:text-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-[#FE2A5C] aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
