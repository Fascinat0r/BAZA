// const requestURL = 'http://127.0.0.1:8000/ontomodel'
//
// function sendRequest(method, url, body = null) {
//   const headers = {
//     'Content-Type': 'application/json'
//   }
//
//   return fetch(url, {
//     method: method,
//     body: JSON.stringify(body),
//     headers: headers
//   }).then(response => {
//     if (response.ok) {
//       return response.json()
//     }
//
//     return response.json().then(error => {
//       const e = new Error('Что-то пошло не так')
//       e.data = error
//       throw e
//     })
//   })
// }
//
// sendRequest('GET', requestURL)
//   .then(data => console.log(data))
//   .catch(err => console.log(err))
//
// const body = {
//   name: 'Vladilen',
//   age: 26
// }
//
// // sendRequest('POST', requestURL, body)
// //   .then(data => console.log(data))
// //   .catch(err => console.log(err))

async function a(id) {

    // Send a GET request to the server
    fetch(`http://127.0.0.1:8000/ontomodel?component_id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('TextSystemName').value = data['name'];
            //название системы
            let div = document.getElementById('component-list-group');
            div.innerHTML = '';
            let textArray = data['child'];
            //список компонентов слева
            for (let i = 0; i < textArray.length; i++) {
                // Create new link element
                let a = document.createElement('a');
                let span = document.createElement('span');
                // Set the attributes
                let num = textArray[i]['id']
                a.onclick =upload;
                a.className = "list-group-item list-group-item-action d-flex flex-nowrap justify-content-between";
                a.textContent = textArray[i]['name'];
                a.id = num;
                span.className = "badge btn btn-danger rounded-pill";
                span.id = 'del_btn_' + (i + 1).toString();
                a.appendChild(span);
                // Append the link to the div
                div.appendChild(a);
            }
            // Update the field with id = title
            //document.getElementById('DescriptionTextArea').value = JSON.stringify(data);
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}

function in_start(){
    // Extract the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    a(id);
}
in_start();

function upload(event) {
    let component_id = event.target.id;
    fetch(`http://127.0.0.1:8000/ontomodel?component_id=${component_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //название компонента
            document.getElementById('TextComponentName').value = data['name'];
            // Update the field with id = title
            document.getElementById('DescriptionTextArea').value = data["description"];
            document.getElementById('btn-go-to-component').addEventListener('click', function(){
    a(data['id']);
});
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}