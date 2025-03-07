// External Imports
import { useState, ChangeEvent, FormEvent } from "react";

// Components
import SubHeaders from "../../../components/headers/subHeaders/subHeaders";
import InputField from "../../../components/menuComponents/inputFields/inputFields";

// Functions
import { putRequest } from "../../../utils/fetchRequest";

//Define props for `DeckNamer`
interface DeckNamerProps {
  name: string;
}

export default function DeckNamer({ name }: DeckNamerProps) {
  console.log("render deckNamer");

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deckName, setDeckName] = useState<string>(name);

  function toggleEditMode(): void {
    setIsEditing(prev => !prev);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setDeckName(e.target.value);
  }

  function submitDeckName(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (deckName.trim() === name) return toggleEditMode(); // Prevents unnecessary API calls

    const payload = { name: deckName };

    putRequest<{ success: boolean }>("/api/v1/decks/rename", payload)
      .then(data => {
        if (data.success) {
          toggleEditMode();
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {isEditing ? (
        <EditDeckName deckName={deckName} handleInputChange={handleInputChange} submitDeckName={submitDeckName} />
      ) : (
        <DeckName name={deckName} toggleEditMode={toggleEditMode} />
      )}
    </>
  );
}

interface DeckNameProps {
  name: string;
  toggleEditMode: () => void;
}

//Displays deck name with toggle
function DeckName({ name, toggleEditMode }: DeckNameProps) {
  return (
    <SubHeaders isHeading>
      {name}
      <ActionButton onClick={toggleEditMode}>Edit</ActionButton>
    </SubHeaders>
  );
}

interface EditDeckNameProps {
  deckName: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  submitDeckName: (e: FormEvent<HTMLFormElement>) => void;
}

//Rename deck form
function EditDeckName({ deckName, handleInputChange, submitDeckName }: EditDeckNameProps) {
  return (
    <form onSubmit={submitDeckName} className="flex justify-center">
      <div className="w-1/2">
        <InputField name="deck_name" inputType="text" value={deckName} change={handleInputChange} />
      </div>
      <ActionButton type="submit">Save</ActionButton>
    </form>
  );
}

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function ActionButton({ children, onClick, type = "button" }: ActionButtonProps) {
  return (
    <button type={type} className="px-5 ml-5 rounded-lg bg-red-800 hover:bg-red-500" onClick={onClick}>
      {children}
    </button>
  );
}
