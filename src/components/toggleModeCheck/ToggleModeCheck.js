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
        class="checkboxM"
        id="checkboxMode"
        onChange={(e) => {
          toggleMode(e.target.checked);
        }}
      />
      <label for="checkboxMode" class="checkboxM-label">
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faMoon} />
        <span class="ball"></span>
      </label>
    </div>
  );
}
