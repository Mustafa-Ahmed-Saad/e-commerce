import { Toaster } from "react-hot-toast";

const options = { position: "top-right", reverseOrder: true };

export default function MyToster() {
  return (
    <div>
      <Toaster {...options} />
    </div>
  );
}
