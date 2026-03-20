import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IconButton } from "./project-details/card/IconButton";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "type"
> & {
  value: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
};

export const Input = ({
  value,
  onChange,
  isPassword = false,
  className,
  ...rest
}: InputProps) => {
  const [show, setShow] = useState(false);

  const type = isPassword ? (show ? "text" : "password") : "text";

  return (
    <div className="relative">
      <input
        {...rest}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-black p-2 rounded w-full ${
          isPassword ? "pr-10" : ""
        } ${className || ""}`}
      />

      {isPassword && (
        <IconButton
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </IconButton>
      )}
    </div>
  );
};
