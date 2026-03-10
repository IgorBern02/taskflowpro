type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className={`bg-gray-900 w-full text-white p-2 rounded hover:bg-black transition-colors cursor-pointer disabled:opacity-50 ${rest.className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};
