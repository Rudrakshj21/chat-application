"use strict";

import { searchProfileInDb, insertConversationInDb } from "/js/chat_helpers.js";
import {
  restrictAccess,
  updateAvatarInDb,
  loadAvatar,
  loadUserName,
} from "./utils.js";
$(document).ready(function () {
  // console.log("test");
  // const sender_id = get_user_id(localStorage.getItem("token"));
  restrictAccess();
  loadAvatar(localStorage.getItem("token"));
  searchProfileInDb("%", localStorage.getItem("token"));
  loadUserName(localStorage.getItem("token"));

  $("#sendMessageButton").click(function () {
    if (!$("#inputMessage").val()) {
      swal.fire("please enter a message.....");
    } else {
      // console.log($("#receiverTitle").attr('receiver_id'))

      insertConversationInDb(
        $("#inputMessage").val(),
        $("#receiverTitle").attr("receiver_id")
      );
    }
  });

  $("#imageFile").change(function () {
    const reader = new FileReader();

    reader.readAsDataURL($("#imageFile").prop("files")["0"]);
    reader.addEventListener("load", function () {
      $("#saveAvatar").removeClass("disabled");
      $("#avatar").attr("src", reader.result);
      updateAvatarInDb(reader.result, localStorage.getItem("token"));
    });
  });

  $("#searchButton").click(() => {
    if ($("#searchPeople").val()) {
      searchProfileInDb(
        $("#searchPeople").val(),
        localStorage.getItem("token")
      );
    } else {
      swal.fire("cannot search with empty input");
    }
  });
  $("#logoutBtn").click(() => {
    logout();
  });
});

function logout() {
  localStorage.removeItem("token");
  swal.fire("logged out", "redirecting to login page.....", "success");
  setTimeout(() => {
    window.location.replace("login.html");
  }, 1200);
}

// event delegation
// $("#profileRow").on("click", "li", function (event) {
//   console.log("hi");
// });

/* 
  $("#searchPeople").on("input", function () {
    setTimeout(() => {
      searchProfileInDb($("#searchPeople").val());
    }, 1000);
  });*/
