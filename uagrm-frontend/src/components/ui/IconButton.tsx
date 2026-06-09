import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const IconButton: FC<IconButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className={`hover:bg-accent hover: rounded-full p-2 ${
        rest.className || ""
      }`}
    >
      {children}
    </button>
  );
};
export default IconButton;
