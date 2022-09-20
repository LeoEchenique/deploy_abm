import React from "react";
import style from "../_home/home.module.css";
import Nav from "../Nav/Nav";
import Wallet from "../wallet/Wallet";
import LastOperation from "../Last_operation/Last_operation";
import LatestOperations from "../Latest_operation/Latest_operations";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [balance, setBalance] = useState("");

  let user = JSON.parse(localStorage.getItem("user"));

  const currentBalance = async () => {
    let newBalance = await axios.get(`http://localhost:3001/Wallet/${user}`);
    setBalance(newBalance.data);
  };

  return (
    <div className={style.div_container}>
      <Nav />
      <div className={style.home_content_container}>
        <div className={style.wallet}>
          <Wallet balance={balance} />
        </div>
        <div className={style.last_operation}>
          <LastOperation />
        </div>
        <div className={style.last_ten_operations}>
          <LatestOperations currentBalance={currentBalance} />
        </div>
      </div>
    </div>
  );
}
