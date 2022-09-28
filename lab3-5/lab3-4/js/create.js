function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function createBox() {
    let size = document.querySelector('#size_of_box').value;
    let name = document.querySelector('#name_of_box').value;
    let price = document.querySelector('#price_of_box').value;
    
    if (size && name && price && price >= 1) {
        fetch('http://localhost:8080/api/boxes', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'price': parseInt(price),
                'size': size
            })
        })
            .then(res => {
                if (res.status === 200) {
                    size = '';
                    name = '';
                    price = '';
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            });
    }
}