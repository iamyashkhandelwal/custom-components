import { useRef, useState } from "react";

function MaskedInput({ onChange, maskCharacter = "X" }) {
  const inputRef = useRef("");
  const [maskedText, setMaskedText] = useState("");
  const [showNumber, setShowNumber] = useState(false);

  const handleOnKeyDown = (event) => {
    // console.log("!- handleOnKeyDown -!");
    if (event.key === "Backspace") {
      inputRef.current = inputRef.current.slice(0, inputRef.current.length - 1);
    }
    if (isNaN(event.key) && event.key !== "Backspace") {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  };

  const handleInputChange = (event) => {
    // console.log("!! -- handleInputChange -- !!");
    const inputVal = event.target.value;

    if (inputVal.length > maskedText.length) {
      // add only if backspace is not pressed
      inputRef.current += inputVal.slice(-1);
    }
    if (inputVal > 9) {
      // copy-paste
      inputRef.current = inputVal;
    }

    const firstFiveDigits = inputVal.slice(0, 5).replace(/\d/g, maskCharacter);
    const remainingDigits = inputVal.slice(5);
    const maskedInput = firstFiveDigits + remainingDigits;
    setMaskedText(maskedInput);

    onChange?.({ original: inputRef.current, masked: maskedInput });
  };

  return (
    <>
      <input
        type={"text"}
        onChange={handleInputChange}
        onKeyDown={handleOnKeyDown}
        value={showNumber ? inputRef.current : maskedText}
        maxLength={9}
      />
      <button onClick={() => setShowNumber(!showNumber)}>show number</button>
    </>
  );
}

export default MaskedInput;
