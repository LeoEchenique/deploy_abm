/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Nav from "../Nav/Nav";
import style from "./NewOperation.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { validator } from "../../helpers/Validator";
export default function NewOperation() {
  let { id } = useParams();
  let user = JSON.parse(localStorage.getItem("user"));
  const [updateOp, setUpdateOp] = useState(null);
  const [err, setErr] = useState({});
  const [swali, setSwali] = useState(false);
  const [form, setForm] = useState({
    Reason: "",
    Mount: "",
    Type: "Select",
    Token: user.Token,
  });

  const getOp = async () => {
    if (id) {
      let operation = await axios.get(`http://localhost:3001/Operations/${id}`);
      setUpdateOp(operation.data);
      setForm({
        ...form,
        Type: operation.data.Type,
      });
    }
  };
  useEffect(() => {
    getOp();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "Select") {
      e.target.opacity = 0;
      e.target[0].disabled = true;
    }
    setForm((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = validator(form, "operation");

    if (updateOp !== null) {
      if (success === true) {
        await axios
          .put(`http://localhost:3001/Operations/UpDate/${updateOp.Id}`, form)
          .then(() => {
            setSwali(true);
          });
        return;
      }
    }
    if (success === true) {
      await axios
        .post("http://localhost:3001/Operations/New", form)
        .then(() => setSwali(true))
        .catch((err) => alert(err.response.data));
    } else {
      return setErr(success);
    }
  };
  const fireSwal = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Nice! you will be redirected shortly",
      showConfirmButton: false,
      timer: 1500,
      didClose: () => window.location.replace("http://localhost:3000/Home"),
    });
  };
  return (
    <div className={style.div_container}>
      <div className={style.nav_container}>
        <Nav />
      </div>
      {swali === true ? fireSwal() : null}
      {updateOp !== null ? (
        <form
          className={style.form_box}
          onChange={(e) => handleChange(e)}
          onSubmit={handleSubmit}
        >
          <h2 className={style.H2}>Make a new operation</h2>
          <div className={style.container_form}>
            <div className={style.form}>
              <label htmlFor="Reason" className={style.form__label}>
                Reason:
              </label>
              <input
                type="text"
                placeholder={updateOp.Reason}
                className={style.form_field}
                name="Reason"
                id="Reason"
              />
              {err?.reason?.length ? (
                <span className={style.err}>{err.reason}</span>
              ) : null}
              <label htmlFor="Type" className={style.form__label}>
                Operation type:
              </label>
              <select
                name="type"
                className={`${style.form_field} ${style.Select}`}
              >
                <option defaultValue={updateOp.Type}>{updateOp.Type}</option>
              </select>
              <input
                type="number"
                placeholder={updateOp.Mount}
                name="Mount"
                className={style.form_field}
              />
              {err?.amount?.length ? (
                <span className={style.err}>{err.amount}</span>
              ) : null}
              <input type="submit" value="Submit" className={style.submit} />
            </div>
          </div>
        </form>
      ) : (
        <form
          className={style.form_box}
          onChange={(e) => handleChange(e)}
          onSubmit={handleSubmit}
        >
          <h2 className={style.H2}>Make a new operation</h2>
          <div className={style.container_form}>
            <div className={style.form}>
              <label htmlFor="Reason" className={style.form__label}>
                Reason:{" "}
              </label>
              <input
                className={style.form_field}
                type="text"
                placeholder="Reason..."
                id="reason"
                name="Reason"
              />
              {err?.reason?.length ? (
                <span className={style.err}>{err.reason}</span>
              ) : null}
              <label htmlFor="Type">Operation type: </label>
              <select
                id="Select"
                name="Type"
                className={`${style.form_field} ${style.Select}`}
                onClick={(e) => handleChange(e)}
              >
                <option className={style.option}>Type</option>
                <option className={style.option}>Income</option>
                <option className={style.option}>Expense</option>
              </select>
              {err?.type?.length ? (
                <span className={style.err}>{err.type}</span>
              ) : null}
              <label htmlFor="Mount">Amount: </label>
              <input
                className={style.form_field}
                type="number"
                placeholder="Amount"
                id="Amount"
                name="Mount"
              />
              {err?.amount?.length ? (
                <span className={style.err}>{err.amount}</span>
              ) : null}
              <input type="submit" value="Submit" className={style.submit} />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
