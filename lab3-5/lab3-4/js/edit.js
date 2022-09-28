let boxId = localStorage.getItem('id');
let boxName = document.querySelector('#name_of_box');
let boxPrice = document.querySelector('#price_of_box');
let boxSize = document.querySelector('#size_of_box');

function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function getBox(id) {
    fetch(`http://localhost:8080/api/boxes/get/${id}`)
        .then(res => res.json())
        .then(data => {

            boxName.value = data.name;
            boxPrice.value = data.price;
            boxSize.value = data.size;
        })
        .catch(() => {
            document.querySelector('.alert').textContent = 'Something go wrong';
            showAlert();
        });
}

async function updateBoxes() {
    if (boxName.value && boxPrice.value && boxSize.value && boxPrice.value >= 1) {
        fetch(`http://localhost:8080/api/boxes/update/${boxId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': boxName.value,
                'price': boxPrice.value,
                'size': boxSize.value
            })
        })
            .then(res => {
                if (res.ok) {
                    boxName.value = '';
                    boxPrice.value = '';
                    boxSize.value = '';
                    localStorage.removeItem('id');
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            })
    }
}

getBox(boxId);