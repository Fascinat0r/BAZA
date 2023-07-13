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

  // Send request to server
  fetch('http://127.0.0.1:8000/auth/login', {
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
      throw new Error('Request failed with status ' + response.status);
    }
  })
  .catch(function(msg) {
    // Handle error
     console.log("catch");
    console.log(JSON.stringify(msg));
    if (msg.status === 204) {
      window.location.href = "/viewing&id=52";
    } else {
      console.log(msg);
    }
  });
});

