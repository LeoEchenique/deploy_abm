import React from "react";
import style from "./last_operation.module.css";
import icon from "../../icons/icon_operations.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Last_operation() {
  const [operation, setOperation] = useState({});
  let user = JSON.parse(localStorage.getItem("user"));

  const getOperation = async () => {
    let last_operation = await axios.get(
      `http://localhost:3001/Operations/Latest/${user.Token}`
    );

    setOperation(last_operation.data[0]);
  };
  useEffect(() => {
    getOperation();
  }, []);

  return (
    <div className={style.div_container}>
      <h1>Last operation</h1>
      {operation ? (
        <div className={style.operation}>
          <img src={icon} alt="" />
          <h3 className={style.reason}>{operation.Reason}</h3>
          <h3>{operation.Type}</h3>
          <h3>{operation.Date}</h3>
          {operation.Type === "Income" ? (
            <h3 className={style.mount_more}> + $ {operation.Mount}</h3>
          ) : (
            <h3 className={style.mount_less}> - $ {operation.Mount}</h3>
          )}
        </div>
      ) : (
        <h1>You don't have any operations yet, make one!</h1>
      )}
      <Link
        className={style.button_operation}
        to="/Home/Operations/NewOperation/"
      >
        {" "}
        Submit an operation{" "}
      </Link>{" "}
    </div>
  );
}
