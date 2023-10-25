import { toast } from "react-hot-toast";
import { useContextMain } from "./../contexts/MainContext";

export const notify = (type, message) => {
  const htmlTag = document.documentElement;
  const style =
    htmlTag.getAttribute("data-bs-theme") === "dark"
      ? {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }
      : {};

  return type
    ? toast[type](message, {
        style: style,
      })
    : toast(message);
};
