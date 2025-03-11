//Types
import { TokenType } from "../../../utils/types";

//Stylesheets
import "./token.scss";

interface TokenProps {
  token: TokenType;
}

export default function Token({ token }: TokenProps) {
  const { rune, effect_type } = token;

  return(
    <div className={ `token ${ effect_type }` }>
      <div className="outer-ring" />
      <div className="colored-layer">
        <svg viewBox="0 0 120 120" className="text-ring">
          <defs>
            <path id="circlePath" d="M 60, 60
              m -30, 0
              a 30,30 0 1,1 60,0
              a 30,30 0 1,1 -60,0"
            />
          </defs>
          <text className="gold-text">
            <textPath xlinkHref="#circlePath">Τύχης Χείρ • Τύχης Χείρ • Τύχης Χείρ • </textPath>
          </text>
        </svg>
      </div>
      <div className="gold-separator"/>
      <div className="inner-core">
        <span className="rune">{ rune }</span>
      </div>
    </div>
  )
}