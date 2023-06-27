let cur_component = 0;

async function upload_system(id) {
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
    await upload_system(id);
}
in_start();

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
            cur_component = data['id']; //говнокод

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
            //кнопка открыть
            document.getElementById('btn-go-to-component').addEventListener('click', function () {
                upload_system(cur_component);
            });
            //таблица компонентов
            let tbody = document.getElementById('table-body');
            tbody.innerHTML = '';
            let components = data["child"]; //list
            //вставка компонентов
            for (let i = 0; i < components.length; i++) {
                let newRow = document.createElement("tr");

                // Create a new table header cell element
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = (i+1).toString();

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

                // Append the table header cell, table data cells to the table row
                newRow.appendChild(th);
                newRow.appendChild(td1);
                newRow.appendChild(td2);

                // Append the table row to the tbody
                tbody.appendChild(newRow);
            }

        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}