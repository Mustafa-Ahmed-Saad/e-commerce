import "./ToggleModeCheck.css";

import React from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContextMain } from "./../../contexts/MainContext";

export default function ToggleModeCheck({ toggleMode, inputRef }) {
  const { mode } = useContextMain();

  return (
    <div id="toggleMode">
      <input
        type="checkbox"
        checked={mode === "dark" ? true : false}
        ref={inputRef}
        className="checkboxM"
        id="checkboxMode"
        onChange={(e) => {
          toggleMode(e.target.checked);
        }}
      />
      <label htmlFor="checkboxMode" className="checkboxM-label">
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faMoon} />
        <span className="ball"></span>
      </label>
    </div>
  );
}
