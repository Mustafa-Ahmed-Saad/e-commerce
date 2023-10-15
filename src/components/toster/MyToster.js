// import axios from "axios";
// import React, { useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { getData } from "../../helper/api";

import { Toaster } from "react-hot-toast";

const options = { position: "top-right", reverseOrder: true };

export default function MyToster() {
  return (
    <div>
      <Toaster {...options} />
    </div>
  );
}
