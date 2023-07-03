let cur_material = 0;

async function upload_component(id) {
    console.log("Upload component");
    // Send a GET request to the server
    fetch(window.location.origin + `/ontomodel?component_id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('TextComponentName').value = data['name'];
            //название системы
            let div = document.getElementById('component-list-group');
            div.innerHTML = '';
            let textArray = data['material'];
            //список материалов слева
            for (let i = 0; i < textArray.length; i++) {
                // Create new link element
                let a = document.createElement('a');
                let span = document.createElement('span');
                // Set the attributes
                let num = textArray[i]['id']
                a.onclick = upload_material;
                a.className = "list-group-item list-group-item-action d-flex flex-nowrap justify-content-between";
                a.textContent = textArray[i]['name'];
                a.id = num;
                span.className = "badge btn btn-danger rounded-pill";
                span.id = 'del_btn_' + (i + 1).toString();
                a.appendChild(span);
                // Append the link to the div
                div.appendChild(a);
            }
            if (textArray.length) {
                //говнокод
                document.getElementById(textArray[0]['id'].toString()).click();
            }
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}

async function in_start() {
    console.log(window.location.origin);
    // Extract the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    await upload_component(id);
}

in_start().catch(error => {
    console.log('There was a problem in starting: ' + error.message);
});

async function upload_material(event) {
    console.log("Upload material");
    let material_id = event.target.id;
    fetch(window.location.origin + `/mat?id=${material_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(JSON.stringify(data));

            cur_material = data['id']; //говнокод

            let area = document.getElementById('component-data-area');
            //название компонента
            document.getElementById('TextMaterialName').value = data['name'];

            //поле описания
            document.getElementById('DescriptionTextArea').value = data["description"];
            document.getElementById('DescriptionTextArea').dispatchEvent(new Event("input"));
            //левый блок компонентов
            //кнопка открыть
            document.getElementById('btn-go-to-component').addEventListener('click', function () {
                if (is_final) {
                    window.location.href = '/material?id=' + cur_material;
                } else {
                    upload_component(cur_material);
                }
            });
            let tbody = document.getElementById('table-body');
            tbody.innerHTML = '';
            let thead = document.getElementById('table-head');
            thead.innerHTML = '';


            //таблица компонентов
            if (data['is_final']) {
                //заголовок
                let newRow = document.createElement("tr");
                let th1 = document.createElement("th");
                th1.textContent = "#";
                let th2 = document.createElement("th");
                th2.textContent = "Название";
                let th3 = document.createElement("th");
                th3.textContent = "Производитель";
                newRow.appendChild(th1);
                newRow.appendChild(th2);
                newRow.appendChild(th3);
                thead.appendChild(newRow);

                let materials = data['material']; //list
                //вставка материалов
                for (let i = 0; i < materials.length; i++) {
                    let newRow = document.createElement("tr");

                    // Create a new table header cell element
                    let th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    th.setAttribute("class", "align-middle")
                    let span = document.createElement("span");
                    span.textContent = (i + 1).toString();
                    th.appendChild(span);

                    // Create a new table data cell element
                    let td1 = document.createElement("td");
                    let link1 = document.createElement("a");
                    link1.setAttribute("class", "nav-link text-white");
                    link1.setAttribute("aria-current", "page");
                    link1.setAttribute("id", materials[i]['id']);
                    link1.textContent = materials[i]['name'];
                    td1.appendChild(link1);

                    // Create a new empty table data cell element
                    let td2 = document.createElement("td");
                    let link2 = document.createElement("a");
                    link2.setAttribute("class", "nav-link text-white");
                    link2.setAttribute("aria-current", "page");
                    link2.textContent = materials[i]['manufacturer'];
                    td2.appendChild(link2);
                    // Append the table header cell, table data cells to the table row
                    newRow.appendChild(th);
                    newRow.appendChild(td1);
                    newRow.appendChild(td2);

                    // Append the table row to the tbody
                    tbody.appendChild(newRow);
                }
            } else {
                //заголовок
                let newRow = document.createElement("tr");
                let th1 = document.createElement("th");
                th1.textContent = "#";
                let th2 = document.createElement("th");
                th2.textContent = "Название";
                let th3 = document.createElement("th");
                th3.textContent = "шт";
                newRow.appendChild(th1);
                newRow.appendChild(th2);
                newRow.appendChild(th3);
                thead.appendChild(newRow);

                //изменить атрибуты
                let components = data["child"]; //list
                //вставка компонентов
                for (let i = 0; i < components.length; i++) {
                    let newRow = document.createElement("tr");

                    // Create a new table header cell element
                    let th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    th.setAttribute("class", "align-middle")
                    let span = document.createElement("span");
                    span.textContent = (i + 1).toString();
                    th.appendChild(span);

                    // Create a new table data cell element
                    let td1 = document.createElement("td");
                    let link = document.createElement("a");
                    link.setAttribute("class", "nav-link text-white");
                    link.setAttribute("aria-current", "page");
                    link.setAttribute("id", components[i]['id']);
                    link.textContent = components[i]['name'];
                    td1.appendChild(link);

                    // Create a new empty table data cell element
                    let td2 = document.createElement("td");
                    td2.textContent = components[i]["postfix"];

                    // Append the table header cell, table data cells to the table row
                    newRow.appendChild(th);
                    newRow.appendChild(td1);
                    newRow.appendChild(td2);

                    // Append the table row to the tbody
                    tbody.appendChild(newRow);
                }
            }

        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}