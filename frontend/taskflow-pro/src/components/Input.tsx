type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({ value, onChange, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-black p-2 rounded ${rest.className || ""}`}
    />
  );
};
