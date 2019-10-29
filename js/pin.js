'use strict';

(function () {
  var pinParams = {
    // размер значка доступного предложения
    OFFER_SIZE_WIDTH: 50,
    OFFER_SIZE_HEIGHT: 70,

    // размер передвигаемого значка
    MAIN_SIZE_WIDTH: 65,
    MAIN_SIZE_HEIGHT: 84,

    // количество отображаемых марок
    LIMIT: 8,

    // минимальная координата по Y
    MIN_Y: 130,

    // максимальная координата по Y
    MAX_Y: 630
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * создаю копии метки
   * @param {Object} offer
   * @return {node}
   */
  function createOffer(offer) {
    var offerPin = mapPinTemplate.cloneNode(true);
    var img = offerPin.querySelector('img');
    offerPin.style.left = (offer.location.x - window.pin.pinParams.OFFER_SIZE_WIDTH / 2) + 'px';
    offerPin.style.top = (offer.location.y - window.pin.pinParams.OFFER_SIZE_HEIGHT) + 'px';
    img.src = offer.author.avatar;
    img.alt = offer.offer.title;

    /**
     * открытие новой карточки при нажатии на маркер
     */
    function onPinClick() {
      var mapCard = document.querySelector('.map__card');
      removePinActiveClass(offerPin);

      if (mapCard) {
        mapCard.remove();
      }

      window.card.renderCard(offer);
    }

    offerPin.addEventListener('click', onPinClick);

    return offerPin;
  }

  /**
   * создаю метки
   * @param {array} data - получаемый массив с сервера
   * @return {node}
   */
  function createPins(data) {
    var pinsFragment = document.createDocumentFragment();
    var closerOffer;

    data.forEach(function (element) {
      closerOffer = createOffer(element);
      pinsFragment.appendChild(closerOffer);
    });

    return pinsFragment;
  }

  function removePinActiveClass(pin) {
    var pins = document.querySelectorAll('.map__pin[type="button"]');

    pins.forEach(function (elem) {
      elem.classList.remove('map__pin--active');
    });

    pin.classList.add('map__pin--active');
  }

  window.pin = {
    pinParams: pinParams,
    mapPinMain: mapPinMain,
    removePinActiveClass: removePinActiveClass,
    createOffer: createOffer,
    createPins: createPins
  };
})();
