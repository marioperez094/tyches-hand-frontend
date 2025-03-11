// External Imports
import { useState, useMemo, useRef, FocusEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";

// Stylesheets
import "./hoverButtons.scss";

interface LinkItem {
  name: string;
  link?: string;
  action?: () => void;
}

export default function HoverButtons({ 
  buttonOptions, 
  arcAngle = 90, 
  radius = 180 
} : {
  buttonOptions: LinkItem[];
  arcAngle?: number;
  radius?: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const numButtons: number = buttonOptions.length;

  function toggleMenu(): void {
    setIsOpen(prevState => !prevState);
  }

  function handleBlur(e: FocusEvent<HTMLDivElement>): void {
    // Only closes if user clicks anywhere outside the hover buttons
    if (hoverRef.current && !hoverRef.current.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  }

  //Compute button positions dynamically
  const buttons = useMemo(
    () =>
      Array.from({ length: numButtons }, (_, index) => {
        const angle = (index / (numButtons - 1)) * arcAngle;
        const angleInRadians = (angle * Math.PI) / 180;
        return {
          x: Math.cos(angleInRadians) * radius,
          y: Math.sin(angleInRadians) * radius,
        };
      }),
    [numButtons, arcAngle, radius]
  );

  function handleNavigation(link: string) {
    setIsOpen(false);
    navigate(link);
  }

  //Reverse button options for correct order
  const reversedButtonOptions = useMemo(() => [...buttonOptions].reverse(), [buttonOptions]);

  console.log("render hoverButtons")

  return (
    <div 
      ref={ hoverRef } 
      className="fixed hover-buttons-container" 
      tabIndex={ 0 } 
      onBlur={handleBlur}
    >
      { /* Main Toggle Button */ }
      <button 
        className="rounded-full text-white absolute main-button" 
        onClick={ toggleMenu }
      >
        { isOpen ? "x" : "+" }
      </button>

      { /* Child Buttons */ }
      { isOpen && (
        <div className="relative hover-buttons">
          { reversedButtonOptions.map((currentButton, index) => {
            const { x, y } = buttons[index];
            const action = () => {
              if (currentButton.link) return handleNavigation(currentButton.link);
              return currentButton.action()
            }

            return(
              <ActionButton key={ index } name={ currentButton.name } action={ action } x={ x } y={ y } />
            )   
          })}
        </div>
      )}
    </div>
  );
}

// Link Button Component
function LinkButton({ 
  link, 
  name, 
  x, 
  y 
}: {
  link: string;
  name: string;
  x: number;
  y: number;
}) {
  console.log("render hoverButtons");

  return (
    <Link 
      to={ link } 
      className="absolute rounded-full child-button" 
      style={{ transform: `translate(${x}px, ${-y}px)` }}
    >
      { name }
    </Link>
  );
}

// Action Button Component
function ActionButton({ 
  name, 
  action = () => {}, 
  x, 
  y 
}: {
  name: string;
  action?: () => void;
  x: number;
  y: number;
}) {
  console.log("render hoverButtons");
  
  return (
    <button className="absolute rounded-full child-button" style={{ transform: `translate(${x}px, ${-y}px)` }} onClick={ action }>
      { name }
    </button>
  );
}
