'use strict';

var pinParams = {
  // размер значка
  SIZE_WIDTH: 50,
  SIZE_HEIGTH: 70,

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
var cardTemplate = document.querySelector('#card');
var cardFilter = document.querySelector('.map__filters-container');
var offers = [];

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

/**
 * создаю карточку одного предложения
 * @param {number} i - элемент массива
 * @return {Object}
 */
function getRandomOffer(i) {
  var locationX = getRandomNumber(0 + pinParams.SIZE_WIDTH, map.clientWidth - pinParams.SIZE_WIDTH);
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
      features: shuffleArray(offerOptions.FEATURES),
      description: getRandomElement(offerOptions.DESCRIPTION),
      photos: shuffleArray(offerOptions.PHOTOS)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };

  return closerOffer;
}

/**
 * создаю копии метки
 * @param {Object} newOffer
 * @return {node}
 */
function createOffer(newOffer) {
  var offerPin = mapPinTemplate.cloneNode(true);
  var img = offerPin.querySelector('img');
  offerPin.style.left = newOffer.location.x + 'px';
  offerPin.style.top = newOffer.location.y + 'px';
  img.src = newOffer.author.avatar;
  img.alt = newOffer.offer.title;

  return offerPin;
}

/**
 * создаю метки
 * @param {number} i - число меток
 * @return {node}
 */
function createPins() {
  var pinsFragment = document.createDocumentFragment();
  var closerOffer;

  for (var e = 0; e < pinParams.LIMIT; e++) {
    closerOffer = getRandomOffer(e);
    offers.push(closerOffer);
    pinsFragment.appendChild(createOffer(closerOffer));
  }
  return pinsFragment;
}

// вставляю метки на карту
mapPins.appendChild(createPins());

/**
 * перемешиваю массив и получаю случайное количество элементов из него
 * @param {array} arr - перемешиваемый массив
 * @return {array}
 */
function shuffleArray(arr) {
  var j;
  var temp;

  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr.slice(0, getRandomNumber(0, (arr.length + 1)));
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
 * @return {any} - полученный элемент массива
 */
function getRandomElement(arr) {
  var arrayElement = Math.floor(Math.random() * arr.length);
  return arr[arrayElement];
}

// перевожу названия
var offerTypeTranslation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

/**
 * создаю отображение удобств
 * @param {array} features - массив со всеми видами удобств
 * @return {node}
 */
function createFeatures(features) {
  var featuresFragment = document.createDocumentFragment();
  var featuresElement;

  for (var q = 0; q < features.length; q++) {
    featuresElement = document.createElement('li');
    featuresElement.className = 'popup__feature popup__feature--' + features[q];

    featuresFragment.appendChild(featuresElement);
  }

  return featuresFragment;
}

/**
 * создаю отображение фотографий отеля
 * @param {array} photos - массив со всеми фотографиями
 * @return {node}
 */
function createPhotos(photos) {
  var photosFragment = document.createDocumentFragment();
  var photosTemplate;
  var photosElement;
  var photoImg;

  for (var w = 0; w < photos.length; w++) {
    photosTemplate = cardTemplate.content.querySelector('.popup__photos');
    photosElement = photosTemplate.cloneNode(true);
    photoImg = photosElement.querySelector('img');

    photoImg.src = photos[w];
    photoImg.width = 45 + 'px';
    photoImg.height = 40 + 'px';
    photoImg.alt = 'offer image';

    photosFragment.appendChild(photosElement);
  }

  return photosFragment;
}

/**
 * отрисовываю карточку метки
 * @param {Object} card
 * @return {node}
 */
function renderCard(card) {
  var cardElement = cardTemplate.content.querySelector('.map__card').cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerTypeTranslation[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + getSpellingRooms(card.offer.rooms) + ' для ' + card.offer.guests + ' ' + getSpellingGuests(card.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeatures(card.offer.features));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(createPhotos(card.offer.photos));

  return cardElement;
}

var popupOffer = renderCard(offers[getRandomNumber(0, offers.length)]);

/**
 * проверяю полученный элемент массива, если соответствует условию, то меняю текст
 * @param {number} g - элемент массива guests[]
 * @return {stirng}
 */
function getSpellingGuests(g) {
  return (g === 1) ? ' гостя' : ' гостей';
}

/**
 * проверяю полученный элемент массива, если соответствует условию, то меняю текст
 * @param {nuber} r - элемент массива rooms[]
 * @return {string}
 */
function getSpellingRooms(r) {
  return (r === 1) ? ' комната' : ' комнаты';
}

// вставляю отрисованную карточку в документ
map.insertBefore(popupOffer, cardFilter);

map.classList.remove('map--faded');
