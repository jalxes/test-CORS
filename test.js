var baseUrl = "http://api.winker.dev:8001",
  token = "",
  message = {
    success: {
      type: "success",
      title: "SUCESSO!",
      text: "Tudo Certo."
    },
    error: {
      type: "error",
      title: "ERRO!",
      text: "Erros ocorreram, cheque o console."
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
    Main.firstCall(form);
  },
  firstCall: function(form) {
    console.log(1);
    serialize = $(form).serializeArray();
    data =
      '{ "username": "' +
      serialize[0].value +
      '", "password": "' +
      serialize[1].value +
      '", "appid": 1298309864872831}';

    $.ajax({
      type: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      url: baseUrl + "/v1/auth/login",
      data: data,
      success: function(data) {
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
      url: baseUrl + "/v1/message?id_portal=2057",
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
