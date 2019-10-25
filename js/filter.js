'use strict';

(function () {
  var MAX_PINS = 5;
  var OFFER_VALUE = {
    min: 10000,
    max: 50000
  };
  var filtres = document.querySelector('.map__filters');
  var housingType = filtres.querySelector('#housing-type');
  var housingPrice = filtres.querySelector('#housing-price');
  var housingRooms = filtres.querySelector('#housing-rooms');
  var housingGuests = filtres.querySelector('#housing-guests');
  var housingFeatures = filtres.querySelector('#housing-features');
  var featuresArray = Array.from(housingFeatures.querySelectorAll('[name="features"]'));

  /**
   * удаляю все метки
   */
  var removePins = function () {
    var allPinsElem = document.querySelectorAll('.map__pin[type="button"]');

    allPinsElem.forEach(function (it) {
      it.remove();
    });
  };

  /**
   * отрисовываю метки согласно заданным параметрам
   */
  var updatePins = window.debounce(function () {
    var allPins = window.allPins;

    /**
     * фильтрация по параметрам (тип жилья, число комнат, число гостей)
     * @param {string} offerValue - значение на карточке
     * @param {string} filterValue - значение на фильтре
     * @return {string}
     */
    var filterByParams = function (offerValue, filterValue) {
      return filterValue === 'any' || offerValue.toString() === filterValue.toString();
    };

    /**
     * фильтрация по цене
     * @param {string} offerValue
     * @param {string} filterValue
     * @return {boolean}
     */
    var filterByPrice = function (offerValue, filterValue) {
      switch (filterValue) {
        case 'low':
          return offerValue < OFFER_VALUE.min;
        case 'middle':
          return offerValue >= OFFER_VALUE.min && offerValue < OFFER_VALUE.max;
        case 'high':
          return offerValue >= OFFER_VALUE.max;
      }
      return true;
    };

    /**
     * фильтрация по удобствам
     * @param {string} offerFeatures
     * @return {array}
     */
    var filterByFeatures = function (offerFeatures) {

      // создаю массив из выбранных удобств
      var checked = featuresArray.filter(function (elem) {
        return elem.checked === true;
      });

      // нахожу вариант, который содержит в себе все выделенные удобства
      return checked.every(function (elem) {
        return offerFeatures.indexOf(elem.value) > -1;
      });
    };

    // проверяю соответствие метки по всем вариантам из фильтрации, если подходит, то записываю в массив
    var filteredPins = allPins.filter(function (el) {
      return filterByParams(el.offer.type, housingType.value) &&
        filterByParams(el.offer.rooms, housingRooms.value) &&
        filterByParams(el.offer.guests, housingGuests.value) &&
        filterByPrice(el.offer.price, housingPrice.value) &&
        filterByFeatures(el.offer.features);
    });

    removePins();

    // максимальное количество отображаемых меток
    var filteredPinsSliced = filteredPins.slice(0, MAX_PINS);
    window.map.mapPins.appendChild(window.pin.createPins(filteredPinsSliced));
  });

  // при смене вариантов в фильтре, удаляю страрые карточки и отрисовываю новые
  filtres.addEventListener('change', function () {
    window.card.removeCard();
    updatePins();
  });

  window.filter = {
    MAX_PINS: MAX_PINS,
    removePins: removePins
  };
})();
