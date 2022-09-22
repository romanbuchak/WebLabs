const boxes = [
    {id: 1, price: 120, name: 'Little box', size: 'XS'},
    {id: 2, price: 35, name: 'Package', size: 'S'},
    {id: 3, price: 34, name: 'AAA1', size: 'M'},
    {id: 4, price: 100, name:'BlaBox', size: 'L'},
    {id: 5, price: 54, name:'BoxBig', size: 'XL'},
];

function getBoxes() {
    return boxes;
}

function getData(box) {
    let htmlData = ' ';
    const mainElement = document.getElementById('boxes');

    if (!box.length) {
        mainElement.innerHTML = '<p>There is no such boxes</p>';
    } else {
        box.forEach(function (element) {
            htmlData += `<div class="box"><p>${element.name}</p><p class="price">${element.price}</p><p>${element.size}</p></div>`
        })
        mainElement.innerHTML = htmlData
    }
}

function getTotalPrice(data) {
    return data.reduce(function(previousValue, currentValue){
        return previousValue + currentValue.price;
    },0)
}

function renderTotalPrice(totalPrice) {
    const mainElement = document.getElementById('total-price');
    mainElement.innerText = totalPrice;
}

function comparator(field) {
    return function (a, b) {
        if ( a[field] < b[field] ){
            return -1;
        }
        if ( a[field] > b[field] ){
            return 1;
        }
        return 0;
    }
}

function sortByPrice(event) {
    event.preventDefault();
    const box = getBoxes();
    const sortedBoxes = box.sort(comparator('price'));
    getData(sortedBoxes);
    renderTotalPrice(getTotalPrice(boxes_data));
}

function sortByName(event) {
    event.preventDefault();
    const box = getBoxes();
    const sortedBoxes = box.sort(comparator('name'));
    getData(sortedBoxes);
    renderTotalPrice(getTotalPrice(boxes_data));
}

function search__boxes(event) {
    event.preventDefault();
    const search_item = document.getElementById('search__element').value;

    if (!search_item.length) return;

    const boxes = getBoxes();
    const search_result = boxes.filter(function (element) {
        const elem_name = element.name.toLowerCase();
        return elem_name.includes(search_item.toLowerCase());
    });

    getData(search_result);
    renderTotalPrice(getTotalPrice(search_result))
}

const boxes_data = getBoxes();
getData(boxes_data);
renderTotalPrice(getTotalPrice(boxes_data));

const sort__form__name = document.getElementById("sort__form__name");
sort__form__name.addEventListener('submit', sortByName);

const sort__form__price = document.getElementById("sort__form__price");
sort__form__price.addEventListener('submit', sortByPrice);

const search__element = document.getElementById("search__form");
search__element.addEventListener('submit', search__boxes);
