import React from "react";
import style from "./wallet.module.css";
import icon_update from "../../icons/icon_verify.png"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Wallet() {
  const [wallet, setWallet] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const getWallet = async () => {
    let wallet = await axios.get(`http://localhost:3001/Wallet/${user.Token}`);
    setWallet(wallet.data);
  };

  useEffect(() => {
    getWallet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.div_container}>
      <h1>Your wallet</h1>

      <div className={style.card_wallet}>
        <div className={style.head_wallet}>
          <h2>Wallet balance</h2>
          <img className={style.icon_verify} src={icon_update} alt="" />
        </div>
        {wallet ? (
          <h2 key={wallet.Id} className={style.current_balance}>
            ${wallet.Funds}{" "}
          </h2>
        ) : null}
        <h3 className={style.card_number}> **** **** **** ****</h3>
      </div>
    </div>
  );
}
