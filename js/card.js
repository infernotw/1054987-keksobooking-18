'use strict';

(function () {
  var keycode = {
    ENTER: 13,
    ESC: 27
  };

  var rooms = ['комната', 'комнаты', 'комнат'];
  var guests = ['гостя', 'гостей', 'гостей'];
  var cardTemplate = document.querySelector('#card');
  var cardFilter = document.querySelector('.map__filters-container');

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
      photoImg.width = 45;
      photoImg.height = 40;
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
    var cardFragment = document.createDocumentFragment();
    var cardElement = cardTemplate.content.querySelector('.map__card').cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypeTranslation[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.utils.declension(card.offer.rooms, rooms) + ' для ' + card.offer.guests + ' ' + window.utils.declension(card.offer.guests, guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeatures(card.offer.features));
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createPhotos(card.offer.photos));

    var closeCard = cardElement.querySelector('.popup__close');

    // закрытие карточки по клику
    closeCard.addEventListener('click', function () {
      cardElement.remove();
    });

    // закрытие карточки по нажатию ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === keycode.ESC) {
        cardElement.remove();
      }
    });

    cardFragment.appendChild(cardElement);
    window.map.mapMain.insertBefore(cardFragment, cardFilter);

    return cardElement;
  }

  window.card = {
    keycode: keycode,
    renderCard: renderCard
  };
})();
