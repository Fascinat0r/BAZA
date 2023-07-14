let cur_state = {};
let cur_system = {};
window.onpopstate = function (event) {
    if (event.state) {
        console.log("upload system from pop state");
        upload_system(event.state.id, false);
    }
};


async function upload_system(id, is_new) {
    console.log("Upload system");
    // Send a GET request to the server
    fetch(window.location.origin + `/ontomodel?component_id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            cur_system = data;
            console.log("upload system new=" + is_new.toString() + cur_system["name"]);
            if (is_new) {
                history.pushState({id: cur_system['id']}, cur_system['name'], `?id=${cur_system['id']}`);
            }
            document.getElementById('TextSystemName').value = data['name'];
            document.getElementById('left-list-label').innerText = 'Компоненты';
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
                a.onclick = upload_component;
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

async function reverse_event(event) {
    let component_id = cur_state['id'];
    await upload_reverse(component_id);
}

//говнокод, дубликация
async function upload_reverse(id) {
    console.log("Upload system");
    // Send a GET request to the server
    fetch(window.location.origin + `/ontomodel/reverse?component_id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            cur_system = data;
            document.getElementById('TextSystemName').value = "Обратный ход - " + data['name'];
            document.getElementById('left-list-label').innerText = 'Содержится в';
            //название системы
            let div = document.getElementById('component-list-group');
            div.innerHTML = '';
            let textArray = data['parent'];

            //список компонентов слева
            for (let i = 0; i < textArray.length; i++) {
                // Create new link element
                let a = document.createElement('a');
                let span = document.createElement('span');
                // Set the attributes
                let num = textArray[i]['id'];
                a.onclick = upload_component;
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

    //кнопка открыть
    document.getElementById('btn-go-to-component').addEventListener('click', async function () {
        if (cur_state["is_final"]) {
            document.location = "/material?id=" + cur_state['id'];
        } else {
            console.log("upload system from button");
            await upload_system(cur_state['id'], true);
        }
    });

    //кнопка обратный ход
    document.getElementById('btn-reverse').addEventListener('click', reverse_event);

    // Extract the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log("upload system from start");
    await upload_system(id, true);
}

window.onload = in_start;

async function upload_component(event) {
    console.log("Upload component");
    let component_id = event.target.id;
    fetch(window.location.origin + `/ontomodel?component_id=${component_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(JSON.stringify(data));
            cur_state = data;
            let area = document.getElementById('component-data-area');
            //название компонента
            document.getElementById('TextComponentName').value = data['name'];
            let carouselContainer = document.getElementById('carouselContainer');
            if (data['data'].hasOwnProperty('img')) {
                //карусель
                let carousel, indicators, carouselInner;
                if (document.getElementById('carouselCaptions') === null) {
                    console.log("Create carousel");
                    //создание карусели если сейчас её нет
                    // carouselContainer = document.createElement('div');
                    // carouselContainer.className = 'container';
                    // carouselContainer.id = 'carouselContainer';

                    // Create carousel element
                    carousel = document.createElement('div');
                    carousel.id = 'carouselCaptions';
                    carousel.className = 'carousel carousel-dark slide';
                    carousel.setAttribute('data-bs-ride', 'carousel');

                    indicators = document.createElement('div');
                    indicators.className = 'carousel-indicators';
                    indicators.id = 'carousel-indicators';
                    carousel.appendChild(indicators);

                    carouselInner = document.createElement('div');
                    carouselInner.className = 'carousel-inner';
                    carouselInner.id = 'carousel-inner';
                    carousel.appendChild(carouselInner);
                    // Create carousel controls
                    let prevButton = document.createElement('button');
                    prevButton.className = 'carousel-control-prev';
                    prevButton.type = 'button';
                    prevButton.setAttribute('data-bs-target', '#carouselCaptions');
                    prevButton.setAttribute('data-bs-slide', 'prev');

                    let prevIcon = document.createElement('span');
                    prevIcon.className = 'carousel-control-prev-icon';
                    prevIcon.setAttribute('aria-hidden', 'true');

                    let prevHidden = document.createElement('span');
                    prevHidden.className = 'visually-hidden';
                    prevHidden.textContent = 'Предыдущий';

                    prevButton.appendChild(prevIcon);
                    prevButton.appendChild(prevHidden);

                    let nextButton = document.createElement('button');
                    nextButton.className = 'carousel-control-next';
                    nextButton.type = 'button';
                    nextButton.setAttribute('data-bs-target', '#carouselCaptions');
                    nextButton.setAttribute('data-bs-slide', 'next');

                    let nextIcon = document.createElement('span');
                    nextIcon.className = 'carousel-control-next-icon';
                    nextIcon.setAttribute('aria-hidden', 'true');

                    let nextHidden = document.createElement('span');
                    nextHidden.className = 'visually-hidden';
                    nextHidden.textContent = 'Следующий';

                    nextButton.appendChild(nextIcon);
                    nextButton.appendChild(nextHidden);

                    carousel.appendChild(prevButton);
                    carousel.appendChild(nextButton);

                    carouselContainer.appendChild(carousel);
                } else {
                    console.log("Carousel already exist");
                    //берём сущности если карусель уже существует
                    carousel = document.getElementById('carouselContainer');
                    indicators = document.getElementById('carousel-indicators');
                    carouselInner = document.getElementById('carousel-inner');
                }
                console.log("Carousel updating");
                //карусель изображения
                let imgArr = data['data']['img'];

                //Обновление индикаторов
                indicators.innerHTML = '';
                for (let i = 0; i < imgArr.length; i++) {
                    let button = document.createElement('button');
                    button.type = 'button';
                    button.setAttribute('data-bs-target', '#carouselCaptions');
                    button.setAttribute('data-bs-slide-to', i.toString());
                    button.setAttribute('aria-label', 'Slide ' + (i + 1));
                    if (i === 0) {
                        button.className = 'active';
                        button.setAttribute('aria-current', 'true');
                    }
                    indicators.appendChild(button);
                }
                //Обновление внутренней части карусели
                carouselInner.innerHTML = '';
                for (let i = 0; i < imgArr.length; i++) {
                    let carouselItem = document.createElement('div');
                    carouselItem.className = i === 0 ? 'carousel-item active' : 'carousel-item';

                    let img = document.createElement('img');
                    img.src = '/static/img/references/' + imgArr[i];
                    img.className = 'd-block w-100';
                    img
                    img.alt = '...';

                    carouselItem.appendChild(img);
                    carouselInner.appendChild(carouselItem);
                }

            } else {
                if (document.getElementById('carouselCaptions') !== null) {
                    carouselContainer.removeChild(document.getElementById('carouselCaptions'));
                }
            }
            //поле описания
            document.getElementById('DescriptionTextArea').value = data["description"];
            document.getElementById('DescriptionTextArea').dispatchEvent(new Event("input"));
            //левый блок компонентов
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
                th3.textContent = "Шт";
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
                    let span1 = document.createElement("span");
                    span1.textContent = components[i]['postfix'];
                    td2.appendChild(span1);

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