import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-[#FE2A5C]  px-4 text-sm font-medium text-white transition-colors hover:bg-[#FE2A5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

//FIXME: Boton figma
// "w-[328px] h-[48px] px-[16px] py-[8px] gap-[8px] rounded-tl-[4px] bg-[#FE2A5C] opacity-0">