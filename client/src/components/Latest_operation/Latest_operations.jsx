import React from "react";
import style from "./Latest_operations.module.css";
import icon from "../../icons/icon_operations.png";
import icon_edit from "../../icons/icon_edit.png";
import icon_delete from "../../icons/icon_delete.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LatestOperation({ currentBalance }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const [operations, setOperations] = useState([]);

  const getOperations = async () => {
    let operation = await axios.get(
      `http://localhost:3001/Operations/Latest/${user.Token}`
    );
    setOperations(operation.data);
  };
  useEffect(() => {
    getOperations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3001/Operations/Delete/${id}`);
    getOperations();
  }

  return (
    <div className={style.div_container}>
      <div>
        <h2>Latest operations</h2>
      </div>
      <div>
        <div className={style.operation_row}>
          {operations?.length ? (
            operations.map((operation) => {
              return (
                <div className={style.operation} key={operation.Id}>
                  <img className={style.icon_cash} src={icon} alt="" />
                  <h3 className={style.reason}>{operation.Reason}</h3>
                  <h3>{operation.Type}</h3>
                  <h3 className={style.date}>{operation.Date}</h3>
                  {operation.Type === "Income" ? (
                    <h3 className={style.mount_more}> + $ {operation.Mount}</h3>
                  ) : (
                    <h3 className={style.mount_less}> - $ {operation.Mount}</h3>
                  )}
                  <div className={style.icons}>
                    <Link
                      to={`/Home/Operations/NewOperation/${operation.Id}`}
                      className={style.icon_edit}
                    >
                      {" "}
                      <img src={icon_edit} alt="" />{" "}
                    </Link>
                    <img
                      className={style.icon_delete}
                      src={icon_delete}
                      alt=""
                      onClick={() => handleDelete(operation.Id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h2 className={style.alternative_operations}>
              None operations yet...
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
