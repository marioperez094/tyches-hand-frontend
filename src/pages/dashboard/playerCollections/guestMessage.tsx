//External Imports
import { ChangeEvent, FormEvent, useState } from "react";

//Components
import StandardButton from "../../../components/menuComponents/buttons/standardButton";
import Notification from "../../../components/headers/notification/notification";
import Form from "../../../components/menuComponents/form";

//Context
import { usePlayer } from "../../../context/player"

//Functions
import { putRequest } from "../../../utils/fetchRequest";

export default function GuestMessage() {
  const { player, fetchPlayer } = usePlayer();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  console.log("render GuestMessage");

  function toggleMessage(): void {
    setIsVisible(prev => !prev);
    setErrorMessage("");
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => 
      ({ ...prevData, [name]: value })
    );
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const payload = {
      player: formData,
    };

    putRequest<{ success: true }>("/api/v1/players/convert_to_registered", payload)
      .then(data => {
          setSubmitting(false)

          if (data.success) return fetchPlayer({ deck_stats: true, deck_cards: true, collection_cards: true });;
          setErrorMessage("Unable to convert account.");
        }
      )
      .catch(error => {
        setSubmitting(false);
        console.error(`Account Conversion: ${ error.message }`);
        setErrorMessage(error.message);
      });
  };

  return(
    //Background appears and disappears based on isVisible boolean
    <div className={ `overflow-y-scroll shadow-md rounded-b-lg text-center text-white ${ isVisible ? "guest-message-container" : "" }` }>
      <div className="text-right">
        <button
          className="bg-red-600 font-bold py-2 px-4 rounded-lg my-3 mr-3 hover:bg-red-700 transition"
          onClick={ toggleMessage }
        >
          { isVisible ? "▲" : "▼" }
        </button>
      </div>
      { isVisible && (
        <>
          { /* Toggles between the message and form */ 
            showMessage ? (
              <>
                <p className="font-bold text-lg italic">Warning nameless shadow</p>
                <p className="text-sm">Your fate is bound by the hour, when the session fades, so too will all you've gained. 
                  To defy such oblivion, you need only...
                </p>
                <StandardButton
                  action={ () => setShowMessage(false) }
                >
                  Carve your name into the ledger.
                </StandardButton>
              </>
            ) : (
              <div className="mx-auto lg:w-1/2">
                { errorMessage && <Notification message={ errorMessage } /> }
                <Form
                  submit={ handleSubmit }
                  formData={ formData }
                  change={ handleInputChange }
                  submitting={ submitting }
                  buttonText={ submitting ? "Converting Account..." : "Convert to Registered" }
                />
              </div>
            )
          }
        </>
      )}
    </div>
  )
};