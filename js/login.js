"use strict";
import { hideErrors, handleLogin } from "./utils.js";
import { checkLogin } from "./utils.js";
$(document).ready(function () {
  hideErrors(true);
  checkLogin();
  //   console.log("log");
  $("#login_button").click(handleLogin);
});
