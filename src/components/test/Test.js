import React, { useEffect } from "react";
import Loading from "../locading/Loading";
import MyToster from "../toster/MyToster";
import { getData } from "../../helper/api";
import { toast } from "react-hot-toast";

export default function Test() {
  return (
    <>
      <div>test</div>
      <MyToster
        type="promise"
        asyncFun={async () => await getData("/api/v1/brands")}
        message="Successfully"
      />
    </>
  );
}
