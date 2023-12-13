export function hideErrors(login = false) {
  if (!login) {
    $("#nameError").hide();
  }

  $("#emailError").hide();
  $("#passwordError").hide();
}

export function handleRegister(event) {
  event.preventDefault();
  if (
    validate("reg_name", /^[A-Za-z]{3,}/g, "name") &&
    validate("reg_email", /^\w{3,}@\w{3,}\.\w{2,}$/, "email") &&
    validate(
      "reg_password",
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-])(?=.*[0-9]).{6,}$/,
      "password"
    )
  ) {
    insertDataInDb(
      $("#reg_name").val(),
      $("#reg_email").val(),
      $("#reg_password").val()
    );
  }
}
export function handleLogin(event) {
  event.preventDefault();
  if (
    validate("login_email", /^\w{3,}@\w{3,}\.\w{2,}$/, "email") &&
    validate(
      "login_password",
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-])(?=.*[0-9]).{6,}$/,
      "password"
    )
  ) {
    // console.log("logged in valid format");
    authenticateUser($("#login_email").val(), $("#login_password").val());
  } else {
    swal.fire(
      "FORMAT ERROR",
      "Incorrect password or email format.....",
      "error"
    );
  }
}

export function validate(id, regex, errorType) {
  if (regex.test($(`#${id}`).val())) {
    $(`#${id}`).addClass("is-valid");
    $(`#${id}`).removeClass("is-invalid");
    $(`#${errorType}Error`).hide();
    return true;
  } else {
    $(`#${id}`).addClass("is-invalid");
    $(`#${id}`).removeClass("is-valid");
    $(`#${errorType}Error`).show();
    return false;
  }
}

export function insertDataInDb(reg_name, reg_email, reg_password) {
  $.ajax({
    type: "POST",
    url: "api/index.php",
    data: { reg_name, reg_email, reg_password },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      if (response.status) {
        swal.fire(
          "Registered Successfully",
          "redirecting to login page..",
          "success"
        );
        setTimeout(() => {
          location.href = "login.html";
        }, 2000);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export function authenticateUser(login_email, login_password) {
  $.ajax({
    type: "POST",
    url: "api/login.php",
    data: { login_email, login_password },
    dataType: "JSON",
    success: function (response) {
      if (response.status) {
        localStorage.setItem("token", response.data);
        swal.fire("LOGIN SUCCESS", "redirecting to chat.....", "success");
        setTimeout(() => {
          location.href = "chat.html";
        }, 1500);
      } else {
        swal.fire("LOGIN FAILED", "INVALID PASSWORD OR EMAIL", "error");
      }
    },
    error: function (error) {
      console.log(error);
      swal.fire("LOGIN FAILED", "INVALID PASSWORD OR EMAIL", "error");
    },
  });
}

export function restrictAccess() {
  if (!localStorage.getItem("token")) {
    swal.fire("You were logged out", "please log in again..", "warning");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1400);
  }
}
export function checkLogin() {
  if (localStorage.getItem("token")) {
    swal.fire(
      "You were already logged in..",
      "redirecting to chat page",
      "info"
    );
    setTimeout(() => {
      window.location.replace("chat.html");
    }, 1200);
  }
}

export function updateAvatarInDb(img, token) {
  $.ajax({
    type: "POST",
    url: "api/update_avatar.php",
    data: { img, token },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export function loadAvatar(token) {
  $.ajax({
    type: "POST",
    url: "api/load_avatar.php",
    data: { token },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      if (response.status) {
        $("#avatar").attr("src", response.data.avatar);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
export function loadUserName(token) {
  $.ajax({
    type: "POST",
    url: "api/get_username.php",
    data: { token },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      if (response.status) {
        // console.log(response.data[0]['name'])
        $("#username").text(response.data[0]["name"]);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

