import React from "react";
import Swal from "sweetalert2";

export default function Modal() {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
}
