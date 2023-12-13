"use strict";
let sender_id = get_user_id(localStorage.getItem("token"));
export function searchProfileInDb(profileName, token) {
  $.ajax({
    type: "POST",
    url: "api/search_profile.php",
    data: { profileName, token },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      $("#search").nextAll().remove();
      response.data.forEach((profile) => {
        renderProfiles(profile.name, profile.id, profile.avatar);
        getLatestMessage(profile.id, localStorage.getItem("token"));
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function get_user_id(token) {
  $.ajax({
    type: "POST",
    url: "api/get_user_id.php",
    data: { token },
    dataType: "JSON",
    success: function (response) {
      // console.log("in user id success");
      // console.log(response);
      sender_id = response.data;
    },
    error: function (error) {
      console.log(error);
    },
  });
}
export function renderProfiles(name, id, avatar, latestMessage) {
  if (!avatar) {
    avatar = "default.png";
  }
  const html = `

    <li class="nav-item mb-2 fw-bold fs-5 d-flex align-items-center gap-3" id="li${id}" style="position:relative;width:100%" >
      <img
        src= "${avatar}"
        style="
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  object-fit: cover;
                "
        alt=""
      />
      <div class="">
        <div>${name}</div>
        <div id= "latest${id}">latest message</div>
      </div>
      <div
        class="bg-dark text-white d-flex align-items-center justify-content-center"
        style="width: 25px; height: 25px; border-radius: 50%;position:absolute;right:0px;"

      >
        <span >${id}</span
      </div>
    </li>`;

  $("#profileRow").append(html);
  const li = document.querySelector("#li" + `${id}`);
  let receiverId = `${id}`;
  let receiverName = `${name}`;
  li.setAttribute("receiver-id", receiverId);
  li.setAttribute("receiver-name", receiverName);
  li.onclick = function () {
    // console.log(li.getAttribute("receiver-id"));
    // console.log(li.getAttribute("receiver-name"));
    $("#receiverTitle").text(`${receiverName}`);
    // todo load all the conversations between current user(token) and receiver id
    $("#receiverTitle").attr("receiver_id", `${receiverId}`);

    const token = localStorage.getItem("token");
    const id = Number(receiverId);
    // console.log(token,id);
    loadConversationsFromDb(token, id);
  };
}

export function loadConversationsFromDb(token, id) {
  $.ajax({
    type: "POST",
    url: "api/load_conversation.php",
    data: { token, id },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      // very imp line
      $("#messageRow").empty();
      if (response.status) {
        const messages = response.data;
        console.log();
        console.log("global", sender_id);
        messages.forEach((message) => {
          const time = message["created_at"];
          let date = new Date(time).toLocaleTimeString();
          if (message["sender_id"] == sender_id) {
            renderConversation(message["message"], true, date);
          } else {
            renderConversation(message["message"], false, date);
          }
        });
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export function renderConversation(message, sender = true, time = "") {
  let html = "";
  if (sender) {
    html = `<div class="col-6 me-1 mb-1 bg-dark text-white rounded py-3">${message}</div><div>${time}</div>`;
  } else {
    html = ` <div class="col-6 ms-auto mt-1 me-1 mb-1 bg-primary text-white rounded py-4" >${message}</div><div class="col-6 ms-auto">${time}</div>`;
  }
  $("#messageRow").append(html);
}

export function insertConversationInDb(message, receiverId) {
  // console.log(message,receiverId)
  const token = localStorage.getItem("token");
  const id = Number(receiverId);
  // console.log(id);
  $.ajax({
    url: "api/insert_conversation.php",
    type: "POST",
    dataType: "JSON",
    data: { message, id, token },
    success: function (response) {
      console.log(response);
      if (response.status) {
        renderConversation(message);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export function getLatestMessage(id, token) {
  $.ajax({
    type: "POST",
    url: "api/get_latest_message.php",
    data: { id, token },
    dataType: "JSON",
    success: function (response) {
      // console.log(response);
      const latestMsg = response.data[0]["message"];
      console.log(latestMsg);
      $(`#latest${id}`).text(latestMsg);
      $(`#latest${id}`).css("font-size", "15px");
    },
    error: function (error) {
      console.log(error);
    },
  });
}
