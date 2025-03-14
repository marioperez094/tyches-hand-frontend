// External Imports
import { ReactNode } from "react";

// Stylesheets
import "./hoverText.scss";

interface HoverTextProps {
  name?: string | null;
  description?: string | null;
  effectDescription?: string[];
  isFlipped?: boolean;
  children: ReactNode;
}

export default function HoverText({
  name = null,
  description = null,
  effectDescription = [],
  isFlipped = false,
  children,
}: HoverTextProps) {
  const isBorderVisible = !name || !description;

  return (
    <div className="relative inline-block hover-container">
      <div className="hover-item">{ children }</div>
      <div className={`absolute text-white hover-box ${ isFlipped ? "hide-hover-box" : "" }` }>
        <h3 className={ `${ isBorderVisible ? "" : "include-bottom-border" } text-center hover-name` }>
          { name }
        </h3>
        { description && <p className="hover-description">{ description }</p> } 
        <ul className="hover-effects">
          { effectDescription.map((effect, index) => (
            <li key={ index } className="hover-effect-description py-2">
              { effectDescription.length > 1 && `${ index + 1 }:` } { effect }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
