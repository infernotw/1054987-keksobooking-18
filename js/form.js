'use strict';

(function () {
  var PIN_DEFAULT = {
    X: 570,
    Y: 375
  };
  var OFFER_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormLables = adForm.querySelectorAll('label');
  var adFormButtons = adForm.querySelectorAll('button');
  var adFormRoomsNumber = adForm.querySelector('#room_number');
  var adFormGuestsNumber = adForm.querySelector('#capacity');
  var guestsOptions = adFormGuestsNumber.querySelectorAll('option');
  var guestsParams = {
    ANY: guestsOptions[0],
    ONE_GUEST: guestsOptions[1],
    TWO_GUESTS: guestsOptions[2],
    NOT_FOR_GUESTS: guestsOptions[3],
  };
  var guestsIndex = {
    ONE: 2,
    NO_ONE: 3
  };
  var adFormTitle = adForm.querySelector('#title');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFeatures = mapFilters.querySelectorAll('input');

  /**
   * парметры неактивной страницы
   */
  function deactivatePage() {
    adForm.reset();
    mapFilters.reset();
    window.filter.removePins();
    window.photoLoad.removePhotos();
    setDefaultRoomsStatus();
    window.map.mapMain.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach(setDisableAttribute);
    window.map.mapFiltersSelect.forEach(setDisableAttribute);
    mapFiltersFeatures.forEach(setDisableAttribute);
    adFormButtons.forEach(setDisableAttribute);
    adFormLables.forEach(setDisableAttribute);
    window.card.removeCard();
    window.map.mapPinMain.style.left = PIN_DEFAULT.X + 'px';
    window.map.mapPinMain.style.top = PIN_DEFAULT.Y + 'px';
    window.map.isActivate = false;
  }

  // действия при нажатии на кнопку "очистить"
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePage();
    window.map.writeInactiveAdress();
  });

  /**
   * устанавливаю элементам массива атрибут disabled
   * @param {node} elem - элемент массива
   */
  function setDisableAttribute(elem) {
    elem.setAttribute('disabled', 'disabled');
    elem.style.cursor = 'default';
  }

  adFormFieldsets.forEach(setDisableAttribute);
  mapFiltersFeatures.forEach(setDisableAttribute);

  /**
   * удаляю у элементов массива атрибут disabled
   * @param {node} elem - элемент массива
   */
  function removeDisableAttribute(elem) {
    elem.removeAttribute('disabled');
    elem.style.cursor = 'pointer';
  }

  // начальное состояние выбора комнат и гостей
  function setDefaultRoomsStatus() {
    adFormGuestsNumber.selectedIndex = guestsIndex.ONE;
    guestsParams.ANY.disabled = true;
    guestsParams.ONE_GUEST.disabled = true;
    guestsParams.TWO_GUESTS.disabled = false;
    guestsParams.NOT_FOR_GUESTS.disabled = true;
  }

  setDefaultRoomsStatus();

  // устанавливаю подходящие условия при выборе количества комнат
  adFormRoomsNumber.addEventListener('change', function () {
    var roomsNumber = adFormRoomsNumber.value;

    switch (roomsNumber) {
      case '1':
        adFormGuestsNumber.selectedIndex = guestsIndex.ONE;
        guestsParams.ANY.disabled = true;
        guestsParams.ONE_GUEST.disabled = true;
        guestsParams.TWO_GUESTS.disabled = false;
        guestsParams.NOT_FOR_GUESTS.disabled = true;
        break;
      case '2':
        adFormGuestsNumber.selectedIndex = guestsIndex.ONE;
        guestsParams.ANY.disabled = true;
        guestsParams.ONE_GUEST.disabled = false;
        guestsParams.TWO_GUESTS.disabled = false;
        guestsParams.NOT_FOR_GUESTS.disabled = true;
        break;
      case '3':
        adFormGuestsNumber.selectedIndex = guestsIndex.ONE;
        guestsParams.ANY.disabled = false;
        guestsParams.ONE_GUEST.disabled = false;
        guestsParams.TWO_GUESTS.disabled = false;
        guestsParams.NOT_FOR_GUESTS.disabled = true;
        break;
      default:
        adFormGuestsNumber.selectedIndex = guestsIndex.NO_ONE;
        guestsParams.ANY.disabled = true;
        guestsParams.ONE_GUEST.disabled = true;
        guestsParams.TWO_GUESTS.disabled = true;
        guestsParams.NOT_FOR_GUESTS.disabled = false;
    }
  });

  // подсказки полей при неправильно введенных данных
  adFormTitle.addEventListener('invalid', function () {
    if (adFormTitle.validity.tooShort) {
      adFormTitle.setCustomValidity('Минимальная длина — 30 символов.');
    } else if (adFormTitle.validity.tooLong) {
      adFormTitle.setCustomValidity('Максимальная длина — 100 символов.');
    } else if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное текстовое поле.');
    } else {
      adFormTitle.setCustomValidity('');
    }
  });

  adFormPrice.placeholder = OFFER_PRICE.flat;

  /**
   * функция выбора типа жилья и минимальной цены
   */
  function setTypeOrPrice() {
    var typeValue = adFormType.value;
    var priceValue = adFormPrice.value;

    switch (typeValue) {
      case 'bungalo':
        adFormPrice.placeholder = OFFER_PRICE.bungalo;
        if (OFFER_PRICE.bungalo > priceValue) {
          adFormPrice.setCustomValidity('Минимальная цена за ночь 0');
        } else {
          adFormPrice.setCustomValidity('');
        }
        break;
      case 'flat':
        adFormPrice.placeholder = OFFER_PRICE.flat;
        if (OFFER_PRICE.flat > priceValue) {
          adFormPrice.setCustomValidity('Минимальная цена за ночь 1 000');
        } else {
          adFormPrice.setCustomValidity('');
        }
        break;
      case 'house':
        adFormPrice.placeholder = OFFER_PRICE.house;
        if (OFFER_PRICE.house > priceValue) {
          adFormPrice.setCustomValidity('Минимальная цена 5 000');
        } else {
          adFormPrice.setCustomValidity('');
        }
        break;
      case 'palace':
        adFormPrice.placeholder = OFFER_PRICE.palace;
        if (OFFER_PRICE.palace > priceValue) {
          adFormPrice.setCustomValidity('Минимальная цена 10 000');
        } else {
          adFormPrice.setCustomValidity('');
        }
        break;
    }
  }

  adFormType.addEventListener('change', setTypeOrPrice);
  adFormPrice.addEventListener('change', setTypeOrPrice);

  /**
   * функция одинаковой смены времени при выборе заезда
   */
  function setTimeInSelect() {
    adFormTimeOut.value = adFormTimeIn.value;
  }

  /**
   * функция одинаковой смены времени при выборе выезда
   */
  function setTimeOutSelect() {
    adFormTimeIn.value = adFormTimeOut.value;
  }

  adFormTimeIn.addEventListener('change', setTimeInSelect);
  adFormTimeOut.addEventListener('change', setTimeOutSelect);

  /**
   * успешная отправка формы
   */
  function formSubmitSuccessHandler() {
    window.success.getSuccessMessage();
    deactivatePage();
  }

  /**
   * ошибка при отправке формы
   * @param {sting} errorMessage
   */
  function formSubmitErrorHandler(errorMessage) {
    window.error.getErrorMessage(errorMessage);
  }

  /**
   * отравка формы
   * @param {Object} evt
   */
  function formSubmitHandler(evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.backend.upload(formSubmitSuccessHandler, formSubmitErrorHandler, data);
  }

  adForm.addEventListener('submit', formSubmitHandler);

  window.form = {
    mapFilters: mapFilters,
    mapFiltersFeatures: mapFiltersFeatures,
    adForm: adForm,
    adFormLables: adFormLables,
    adFormButtons: adFormButtons,
    adFormFieldsets: adFormFieldsets,
    setDisableAttribute: setDisableAttribute,
    removeDisableAttribute: removeDisableAttribute
  };
})();
