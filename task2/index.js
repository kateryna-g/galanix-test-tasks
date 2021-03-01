const pictures = document.getElementsByClassName('pictures-wrap')[0];

let imagesArray = JSON.parse(localStorage.getItem('images')) || [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg'
];

const displayImages = (array) => {

  for (const path of array) {

    const _div = document.createElement('div');
    _div.classList.add('picture');
    _div.setAttribute('name', `${path.slice(0, -4)}`);

    let img = document.createElement('img');
    img.src = 'images/' + path;
    img.classList.add('img');

    if (array.indexOf(path) % 3 === 0) {
      img.classList.add('img-with-border');
    }

    img.setAttribute("onclick", `openModalWindow("${path}")`);

    let removeButton = document.createElement('button');
    removeButton.setAttribute("onclick", `deleteImage("${path}")`);
    removeButton.classList.add('close-button');
    removeButton.innerText = 'x';

    _div.appendChild(img);
    _div.appendChild(removeButton);

    pictures.appendChild(_div);

  }

}

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
}

const getCurrentDate = () => {
  const fullDate = new Date().addHours(2).toISOString().split('T');

  const date = fullDate[0].split('-').reverse().join('.');
  const time = fullDate[1].substr(0, 5);

  return date + ' ' + time;
}

const setDate = () => {
  document.getElementById('date').innerHTML = getCurrentDate();
}

const setImagesCount = () => {
  document.getElementById('imagesCount').innerHTML = 'Images count: ' + imagesArray.length;
}

const openModalWindow = (path) => {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('modal-image').src = 'images/' + path;
}

const closeModalWindow = () => {
  document.getElementById('overlay').style.display = 'none'
}

const deleteImage = (path) => {
  const arr = imagesArray;
  const index = imagesArray.indexOf(path);

  if (index > -1) {
    arr.splice(index, 1);
  }

  const el = pictures.children.namedItem(path.slice(0, -4));

  pictures.removeChild(el);

  localStorage.setItem('images', JSON.stringify(arr));

  setImagesCount();

}

const restoreImages = () => {
  localStorage.removeItem('images');

  pictures.innerHTML = '';

  imagesArray = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg'
  ];

  displayImages(imagesArray);

  setImagesCount();
}

(function init() {
  setDate();

  setInterval(() => {
    setDate();
  }, 1000);

  displayImages(imagesArray);

  setImagesCount();

})();
