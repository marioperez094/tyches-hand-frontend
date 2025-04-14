import Card from "../../components/gameAssets/card/card";
import { HealthBarWithName, HealthBar } from "../../components/gameAssets/healthBar/healthBar";
import "./game.scss";

// 🔵 MAIN SCREEN
export default function GameScreen() {
  const playerHealth = 2000;
  const daimonHealth = 5000;
  const dialogue = "Let's see what's going on.";
  const playerCards = [
    { id: 1, rank: "2", suit: "Clubs", effect: "Bloodstained" },
    { id: 2, rank: "3", suit: "Clubs", effect: "Bloodstained" },
  ];
  const daimonCards = [
    { id: 1, rank: "2", suit: "Clubs", effect: "Bloodstained" },
    { id: 2, rank: "3", suit: "Clubs", effect: "Bloodstained" },
  ];

  return(
    <div className="w-screen h-screen bg-gradient-to-b from-[#4C0A0A] to-black text-white overflow-hidden">
      <div className="m-2">
        <HealthBarWithName
          name="The Draw"
          health={ daimonHealth }
          max_health={ 5000 }
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center" id="eye">
          <div className="pupil" />
        </div>
      </div>

      { dialogue &&
        <div className="absolute -top-<50> -left-<50> w-full max-w-xl flex justify-center items-center z-50">
          <DialogueBox message={ dialogue } />
        </div>
      }

      <div className="flex justify-center m-5">
      { daimonCards.length > 0 &&
        daimonCards.map(card => 
          <Card card={ card } />
        )
      }
      </div>

      <div className="flex justify-center m-5">
      { playerCards.length > 0 &&
        playerCards.map(card => 
          <Card card={ card } />
        )
      }
      </div>

      <div className="m-2">
        <div className="flex w-screen justify-center text-2xl">
          <h2>The Player</h2>
        </div>
        <HealthBar
          health={ playerHealth }
          max_health={ 5000 }
          isPlayer
        />
      </div>
    </div>
  )
  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-[#4c0a0a] to-black text-white overflow-hidden font-serif">

      {/* 🔺 Daimon Health */}
      <div className="absolute top-3 right-3 left-3 md:left-auto z-50">
        <HealthBarWithName name="The Draw" health={daimonHealth} max_health={5000} />
      </div>

      {/* 🔻 Player Health */}
      <div className="absolute bottom-3 left-3 right-3 md:left-auto z-50">
        <HealthBarWithName name="The Player" health={playerHealth} max_health={5000} isPlayer />
      </div>

      {/* 👁 Daimon Eye */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-40">
        <DaimonEye rune="Θ" />
      </div>

      {/* 💬 Dialogue */}
      <div className="absolute top-[6rem] left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 z-30 pointer-events-none">
        <DialogueBox message={dialogue} />
      </div>

      {/* 🌫️ Shadow Table Fade */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

      {/* 🃏 Table */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-4 pt-32 pb-32 pointer-events-none">
        {/* Daimon cards */}
        <div className="flex justify-center gap-2 md:gap-4 pointer-events-auto">
          {daimonCards.map((_, i) => (
            <CardBack key={i} />
          ))}
        </div>

        {/* Player cards */}
        <div className="flex justify-center gap-2 md:gap-4 pointer-events-auto">
          {playerCards.map(card => (
            <CardFront key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* 🎮 Token & Actions */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex flex-col md:flex-row items-center gap-4">
        <TokenDisplay />
        <ActionButtons />
      </div>
    </div>
  );
}

// 🔋 Health Bar Component
/*function HealthBarWithName({
  name,
  health,
  max_health,
  isPlayer = false,
}: {
  name: string;
  health: number;
  max_health: number;
  isPlayer?: boolean;
}) {
  const percent = (health / max_health) * 100;
  return (
    <div className="flex flex-col items-start gap-1 px-4 w-full max-w-md">
      <span className="text-sm uppercase tracking-widest">{name}</span>
      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            isPlayer ? "bg-red-600" : "bg-gray-400"
          } transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-white/60">{health} / {max_health}</span>
    </div>
  );
}

// 👁 Daimon Eye Component
function DaimonEye({ rune }: { rune: string }) {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-black border-4 border-white rounded-full shadow-xl animate-pulse">
      <span className="text-white text-4xl md:text-5xl font-mono tracking-widest">{rune}</span>
      <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin-slow" />
    </div>
  );
}*/

// 💬 Dialogue Box
function DialogueBox({ message }: { message: string }) {
  return (
    <div className="bg-black/80 border border-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md text-white text-center text-lg">
      {message}
    </div>
  );
}

/*// 🃏 Player Card Front
function CardFront({
  card,
}: {
  card: { id: number; rank: string; suit: string; effect: string };
}) {
  return (
    <div className="w-20 h-32 md:w-24 md:h-36 bg-black border border-white/20 rounded-lg shadow-lg text-white p-2 flex flex-col justify-between">
      <div className="text-sm opacity-60">{card.suit}</div>
      <div className="text-2xl text-center">{card.rank}</div>
      <div className="text-xs text-right italic">{card.effect}</div>
    </div>
  );
}

// 🔙 Card Back
function CardBack() {
  return (
    <div className="w-16 h-24 md:w-20 md:h-28 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white/10 rounded-lg shadow-inner" />
  );
}

// 🪙 Token Display (placeholder)
function TokenDisplay() {
  return (
    <div className="flex gap-2">
      <div className="w-10 h-10 bg-yellow-600 rounded-full shadow-inner" />
      <div className="w-10 h-10 bg-red-700 rounded-full shadow-inner" />
    </div>
  );
}

// 🎮 Action Buttons
function ActionButtons() {
  return (
    <div className="flex gap-4">
      <button className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition">Hit</button>
      <button className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition">Hold</button>
      <button className="bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition">Double</button>
    </div>
  );
}*/
