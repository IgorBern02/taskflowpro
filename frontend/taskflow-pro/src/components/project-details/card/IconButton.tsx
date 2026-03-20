export const IconButton = ({
  children,
  onClick,
  danger,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} p-2 rounded-lg transition
        ${
          danger
            ? " text-red-500 hover:bg-red-100"
            : " text-slate-600 hover:bg-slate-200"
        }`}
    >
      {children}
    </button>
  );
};
