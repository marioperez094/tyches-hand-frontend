//External Imports
import { useMemo } from "react";

//Components
import HoverText from "../../../components/headers/hoverText/hoverText";
import Token from "../../../components/gameAssets/token/token";

//Types
import { TokenType } from "../../../utils/types";

interface TokenStackProps {
  tokens: TokenType[];
  selectedToken: TokenType | null;
  handleTokenTap: (token: TokenType) => void;
  handleSlotTap: (target: string | null) => void;
}

export default function TokenStack({
  tokens,
  selectedToken,
  handleTokenTap,
  handleSlotTap,
}: TokenStackProps) {
  const tokenElements = useMemo(
    () =>
      tokens.map((token) => {
        const isSelected = selectedToken?.id === token.id;

        return(
          <div
            className={ `token-container px-2 py-3 ${ isSelected ? "selected-token" : "" }`}
            key={ token.id }
            onClick={ () => handleTokenTap(token) }
          >
            <HoverText name={ token.name } description={ token.description } effectDescription={[token.inscribed_effect, token.oathbound_effect, token.offering_effect]}>
              <Token token={ token } />
            </HoverText>
          </div>
        )
      }),
    [tokens, selectedToken, handleTokenTap]
  );

  return(
    <div
      className="w-full flex flex-wrap justify-center token-stack"
      onClick={ handleSlotTap }
    >
      { tokenElements }
    </div>
  )
};