document.getElementById('btn-signin').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  let form = document.getElementById('user-form');
  let email = form.elements['floatingInput'].value;
  let password = form.elements['password'].value;
  console.log(email+' '+password);
  // Create request body
  let requestBody = new URLSearchParams();
  requestBody.append('grant_type', '');
  requestBody.append('username', email);
  requestBody.append('password', password);
  requestBody.append('scope', '');
  requestBody.append('client_id', '');
  requestBody.append('client_secret', '');

  function show_validation() {
    let form = document.getElementById('user-form');
    form.classList.add("was-validated");
  }

  // Send request to server
  fetch(location.origin + '/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: requestBody
  })
  .then(function(response) {
    if (response.ok) {
      // Request successful, handle response
      return response;
    } else {
      // Request failed, handle error

      switch (response.status) {
          case 400:
            alert("Неверный логин или пароль.\nПопробуйте снова");
            break;
          case 422:
          show_validation();
          case 500:
            alert("Неизвестная ошибка на стороне сервера.\nПопробуйте позже");
            break;
        }

      throw new Error('Request failed with status ' + response.status);
    }
  })
  .then(function(response) {
    console.log("then");
    console.log();
    // Handle response data
    /* ... */
    if (response.status === 204) {
      window.location.href = "/viewing?id=52";
    } else {
      console.log(response);
    }
    // Redirect or perform other actions based on the response
  })
      .catch(function (response) {
        // Handle error
        console.log("catch");
        console.log(JSON.stringify(response));
        switch (response.status) {
          case 204:
            window.location.href = "/viewing?id=52";
            break;
          case 400:
            alert("Неверный логин или пароль.\nПопробуйте снова");
            break;
          case 500:
            alert("Неизвестная ошибка на стороне сервера.\nПопробуйте позже");
            break;
        }
      });
});

