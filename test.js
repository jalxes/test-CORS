var baseUrl = "http://api.potato.dev:8001",
  token = "",
  message = {
    success: {
      type: "success",
      title: "TOPEZERA!",
      text: "TUDO FAUSTOP."
    },
    error: {
      type: "error",
      title: "DEU RUIM!",
      text: "Por favor, dedo no cu e gritaria."
    }
  };
Main = {
  init: function() {
    var topForm = $("[name=topForm]").validate({
      errorPlacement: function(error, element) {},
      rules: {},
      submitHandler: function(form, event) {
        Main.submitForm(form);
      }
    });
    $("[name=topForm]").submit();
  },

  submitForm: function(form) {
    Main.firstCall();
  },
  firstCall: function() {
    console.log(1);
    $.ajax({
      type: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      url: baseUrl + "/v1/auth/login",
      data: JSON.stringify({
        username: "admin@potato.com.br",
        password: "123",
        appid: 1298309864872831
      }),
      success: function(data) {
        console.log(data);
        if (data) {
          Main.sweetAlert(message.success);
          token = data.token;
          Main.secondCall();
        } else {
          Main.sweetAlert(message.error);
        }
      },
      error: function(xhr, textStatus, thrownError) {
        console.log(textStatus);
        console.log(thrownError);
        Main.sweetAlert(message.error);
      }
    });
  },
  secondCall: function() {
    console.log(2);
    $.ajax({
      type: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      url: baseUrl + "/test?id=11",
      data: {},
      success: function(data) {
        console.log(data);
        if (data) {
          Main.sweetAlert(message.success);
        } else {
          Main.sweetAlert(message.error);
        }
      },
      error: function(xhr, textStatus, thrownError) {
        console.log(textStatus);
        console.log(thrownError);
        Main.sweetAlert(message.error);
      }
    });
  },
  sweetAlert: function(alert) {
    swal({
      type: alert.type,
      title: alert.title,
      html: alert.text,
      showCloseButton: true
    }).catch(swal.noop);
  }
};

$(document).ready(function() {
  Main.init();
});
