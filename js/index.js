"use strict";
import { hideErrors, handleRegister } from "./utils.js";
$(document).ready(function () {
  hideErrors();
  console.log("e");
  $("#reg_button").click(handleRegister);
});

