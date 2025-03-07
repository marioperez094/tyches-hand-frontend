// External Imports
import { ReactNode } from "react";

// Components
import SubHeaders from "../../../components/headers/subHeaders/subHeaders";
import HoverText from "../../../components/headers/hoverText/hoverText";

//Define props interface
interface DeckContainerProps {
  hoverText?: { description: string } | null;
  redText?: boolean | null;
  title: string;
  children: ReactNode;
}

export default function DeckContainer({
  hoverText = null,
  redText = null,
  title,
  children,
}: DeckContainerProps) {
  return (
    <section className="w-full card-drop px-5">
      <SubHeaders>
        { hoverText ? (
          <HoverText description={ hoverText.description } >
            <span className={ redText ? "text-red-300" : "" }>
              { title }
            </span>
          </HoverText>
        ) : (
          <>{ title }</>
        )}
      </SubHeaders>
      {children}
    </section>
  );
}
