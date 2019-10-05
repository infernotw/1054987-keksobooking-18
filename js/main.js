'use strict';

var pinParams = {
  // размер значка
  SIZE: 40,

  // количество отображаемых марок
  LIMIT: 8,

  // минимальная координата по Y
  MIN_Y: 130,

  // максимальная координата по Y
  MAX_Y: 630
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var offers = [];
var elementWidth = document.querySelector('body');

var offerOptions = {
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  TYPES: document.querySelector('#housing-type').children,
  TIMESIN: document.querySelector('#timein').children,
  TIMESOUT: document.querySelector('#timeout').children,
  TITLE: [
    'offer title',
    'another offer title',
    'one more offer title',
    'title of offer'
  ],
  DESCRIPTION: [
    'offer description',
    'another offer description',
    'one more offer description',
    'description of offer'
  ],
  PRICE: {
    MIN: 1,
    MAX: 50000
  },
  ROOMS: {
    MIN: 1,
    MAX: 4
  },
  GUESTS: {
    MIN: 1,
    MAX: 4
  }
};

map.classList.remove('map--faded');

for (var i = 0; i < pinParams.LIMIT; i++) {
  var locationX = getRandomNumber(0 + pinParams.SIZE, elementWidth.clientWidth - pinParams.SIZE);
  var locationY = getRandomNumber(pinParams.MIN_Y, pinParams.MAX_Y);
  var closerOffer = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: getRandomElement(offerOptions.TITLE),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(offerOptions.PRICE.MIN, offerOptions.PRICE.MAX),
      type: offerOptions.TYPES[getRandomNumber(1, offerOptions.TYPES.length)].value,
      rooms: getRandomNumber(offerOptions.ROOMS.MIN, offerOptions.ROOMS.MAX),
      guests: getRandomNumber(offerOptions.GUESTS.MIN, offerOptions.GUESTS.MAX),
      checkin: offerOptions.TIMESIN[getRandomNumber(0, offerOptions.TIMESIN.length)].value,
      checkout: offerOptions.TIMESOUT[getRandomNumber(0, offerOptions.TIMESOUT.length)].value,
      features: getRandomIndex(offerOptions.FEATURES),
      description: getRandomElement(offerOptions.DESCRIPTION),
      photos: getRandomIndex(offerOptions.PHOTOS)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };

  offers.push(closerOffer);
  fragment.appendChild(renderOffers(closerOffer));
}

/**
 * получаю случайное число элементов в массиве
 * @param {array} arr - обрабатываемый массив
 * @return {array} - полученный массив
 */
function getRandomIndex(arr) {
  var elems = [];

  for (var n = getRandomNumber(0, arr.length); n < arr.length; n++) {
    elems.push(arr[n]);
  }

  return elems;
}

/**
 * получаю случайное число
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * получаю случайный элемент из массива
 * @param {array} arr - обрабатываемый массив
 * @return {string} - полученный элемент массива
 */
function getRandomElement(arr) {
  var arrayElement = Math.floor(Math.random() * arr.length);
  return arr[arrayElement];
}

/**
 * отрисовываю метки на карте
 * @param {Object} newOffer
 * @return {node}
 */
function renderOffers(newOffer) {
  var offerPin = mapPinTemplate.cloneNode(true);
  var img = offerPin.querySelector('img');
  offerPin.style.left = newOffer.location.x + 'px';
  offerPin.style.top = newOffer.location.y + 'px';
  img.src = newOffer.author.avatar;
  img.alt = newOffer.offer.title;

  return offerPin;
}

mapPins.appendChild(fragment);
