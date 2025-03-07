//External Imports
import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

//Stylesheets
import "./buttons.scss";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  link: string
  children: ReactNode;
  inverse?: boolean;
}

export default function LinkButton({
  link,
  children,
  inverse,
  ...props
} : LinkButtonProps) {
  return(
    <Link
      to={ link }
      className="text-white uppercase font-bold standard-button"
      { ...props }
    >
      { children }
    </Link>
  )
};