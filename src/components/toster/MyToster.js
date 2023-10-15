import axios from "axios";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { getData } from "../../helper/api";

const options = { position: "top-right", reverseOrder: true };

export default function MyToster({ message, type, asyncFun }) {
  let notify = () => {
    return toast[type](message);
  };

  if (type === "promise") {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await asyncFun();

        const [data, errorMessage] = response;

        if (errorMessage) {
          reject(new Error(errorMessage)); // Use the actual error message
        } else if (data) {
          console.log(response);
          resolve(data);
        } else {
          // Handle unexpected errors (e.g., no data received)
          reject(new Error("Unexpected error occurred"));
        }
      } catch (error) {
        // Handle unexpected errors (e.g., network issues)
        reject(new Error("An error occurred while fetching data"));
      }
    });

    notify = () => {
      return toast.promise(myPromise, {
        loading: "Loading...",
        success: message,
        error: (err) => `oops ${err.toString()}`,
      });
    };
  }

  useEffect(() => {
    notify();
  }, []);

  return (
    <div>
      <Toaster {...options} />
    </div>
  );
}
