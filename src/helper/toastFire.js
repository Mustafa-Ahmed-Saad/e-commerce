import { toast } from "react-hot-toast";

export const notify = (type, message) =>
  type ? toast[type](message) : toast(message);
