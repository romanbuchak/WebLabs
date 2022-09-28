let boxes = [];
let filterArr = [];

function toCreatePage() {
    window.location.href = 'create.html';
}
function toEditPage(id) {
    localStorage.setItem('id', id);
    window.location.href = 'edit.html';
}
function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}
function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}
function createBoxElem(arr) {
    let index = 0;
    arr.forEach(element => {
        document.querySelector('.info').innerHTML += `
        <div class="item">
            <h2>${element.name}</h2>
            <p>${element.price}$</p>
            <p>${element.size}</p>
            <div class="actions">
                <button class="edit" onclick="toEditPage(${element.id})">Edit</button>
                <button class="delete" onclick="deleteBox(${element.id}, ${index++})">Delete</button>
            </div>
        </div>
        `;
    });
}
async function getBoxes() {
    fetch('http://localhost:8080/api/boxes/get')
        .then(res => res.json())
        .then(data => {
            boxes = data;
            document.querySelector('.info').replaceChildren();
            createBoxElem(boxes);
            getTotalPrice(boxes);
        })
        .catch(err => console.log(err));
}
function searchBox() {
    document.querySelector('#sort__form__name').checked = false;
    document.querySelector('#sort__form__price').checked = false;
    let search = document.querySelector('#search__element').value;
    if (search) {
        let reg = new RegExp(`${search}`);
        filterArr = boxes.filter(element => reg.test(element.name) === true);
        document.querySelector('.info').replaceChildren();
        createBoxElem(filterArr);
        getTotalPrice(filterArr);
    } else {
        getBoxes();
    }
}
function sortNameAl(arr) {
    document.querySelector('#sort__form__price').checked = false;
    arr.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    document.querySelector('.info').replaceChildren();
    createBoxElem(arr);
}
function sortByName() {
    if (document.querySelector('#sort__form__name').checked) {
        if (document.querySelector('#search__element').value) {
            sortNameAl(filterArr);
        } else {
            sortNameAl(boxes);
        }
    } else if (!document.querySelector('#search__element').value) {
        document.querySelector('.info').replaceChildren();
        getBoxes();
    }
}
function sortPriceAl(arr) {
    document.querySelector('#sort__form__name').checked = false;
    arr.sort((a, b) => {
        return a.price - b.price;
    });
    document.querySelector('.info').replaceChildren();
    createBoxElem(arr);
}
function sortByPrice() {
    if (document.querySelector('#sort__form__price').checked) {
        if (document.querySelector('#search__element').value) {
            sortPriceAl(filterArr);
        } else {
            sortPriceAl(boxes);
        }
    } else if (!document.querySelector('#search__element').value) {
        document.querySelector('.info').replaceChildren();
        getBoxes();
    }
}
function getTotalPrice(arr) {
    let total = 0;
    arr.forEach(element => {
        total += element.price;
    });
    document.querySelector('#total-price').textContent = `${total}$`;
}
async function deleteBox(id, index) {
    fetch(`http://localhost:8080/api/boxes/delete/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.status === 200) {
                document.querySelector('.info').replaceChildren();
                boxes.splice(index, 1);
                createBoxElem(boxes);
                getTotalPrice(boxes);
            } else {
                showAlert();
            }
        });
}
getBoxes();