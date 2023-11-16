import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { changeMainColor } from "../../contexts/mainColor/mainColorAction";
import { saveInLocalStorage } from "../../helper/localStorage";
import { useContextMain } from "./../../contexts/MainContext";

export default function ColorsPalette() {
  // const [, setMainColorLocalStorage] = useLocalStorage("main-color", "#0dba0d");
  const { mode, mainColor, dispatch } = useContextMain();
  const [color, setColor] = useState("#000" && mainColor);
  const [isColorsPaletteOpen, setIsColorsPaletteOpen] = useState(false);

  function changeMainColorOfContext(value) {
    dispatch(changeMainColor(value));
    document.documentElement.style.setProperty("--main-color", value);
  }

  function handelSubmit(e) {
    e.preventDefault();
    const selectedColor = e.target[0].value;
    changeMainColorOfContext(selectedColor);
  }

  return (
    <div
      className={`position-fixed bg-white top-50 z-1 p-2 rounded-3 transtion-5 ${
        isColorsPaletteOpen ? "start-0" : "start-n10"
      }`}
    >
      <span
        className="position-absolute top-50 start-100 translate-middle-y badge bg-main opacity-50 rounded-start-0 py-2"
        onClick={() => {
          setIsColorsPaletteOpen(!isColorsPaletteOpen);
        }}
      >
        <FontAwesomeIcon icon={faGear} spin={isColorsPaletteOpen} size="xl" />
      </span>
      <form
        onSubmit={(e) => {
          handelSubmit(e);
        }}
        className="d-flex align-items-center"
      >
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-primary ms-2">
          ok
        </button>
      </form>
      <button
        type="button"
        className="btn btn-secondary mt-2 d-block w-100"
        onClick={() => {
          if (mode === "dark") {
            changeMainColorOfContext("#09a009");
            setColor("#09a009");
          } else {
            changeMainColorOfContext("#0dba0d");
            setColor("#09a009");
          }
        }}
      >
        reset
      </button>
    </div>
  );
}
