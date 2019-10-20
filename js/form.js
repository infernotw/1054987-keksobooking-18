'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormRoomsNumber = adForm.querySelector('#room_number');
  var adFormGuestsNumber = adForm.querySelector('#capacity');
  var guestsOptions = adFormGuestsNumber.querySelectorAll('option');
  var adFormTitle = adForm.querySelector('#title');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var OFFER_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  /**
   * устанавливаю элементам массива атрибут disabled
   * @param {node} elem - элемент массива
   */
  function setDisableAttribute(elem) {
    elem.setAttribute('disabled', 'disabled');
  }

  adFormFieldsets.forEach(setDisableAttribute);

  /**
   * удаляю у элементов массива атрибут disabled
   * @param {node} elem - элемент массива
   */
  function removeDisableAttribute(elem) {
    elem.removeAttribute('disabled');
  }

  // начальное состояние выбора комнат и гостей
  adFormGuestsNumber.selectedIndex = 2;
  guestsOptions[0].disabled = true;
  guestsOptions[1].disabled = true;
  guestsOptions[2].disabled = false;
  guestsOptions[3].disabled = true;

  // устанавливаю подходящие условия при выборе количества комнат
  adFormRoomsNumber.addEventListener('change', function () {
    var roomsNumber = adFormRoomsNumber.value;

    switch (roomsNumber) {
      case '1':
        adFormGuestsNumber.selectedIndex = 2;
        guestsOptions[0].disabled = true;
        guestsOptions[1].disabled = true;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        break;
      case '2':
        adFormGuestsNumber.selectedIndex = 2;
        guestsOptions[0].disabled = true;
        guestsOptions[1].disabled = false;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        break;
      case '3':
        adFormGuestsNumber.selectedIndex = 2;
        guestsOptions[0].disabled = false;
        guestsOptions[1].disabled = false;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        break;
      default:
        adFormGuestsNumber.selectedIndex = 3;
        guestsOptions[0].disabled = true;
        guestsOptions[1].disabled = true;
        guestsOptions[2].disabled = true;
        guestsOptions[3].disabled = false;
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
  function timeInSelect() {
    adFormTimeOut.value = adFormTimeIn.value;
  }

  /**
   * функция одинаковой смены времени при выборе выезда
   */
  function timeOutSelect() {
    adFormTimeIn.value = adFormTimeOut.value;
  }

  adFormTimeIn.addEventListener('change', timeInSelect);
  adFormTimeOut.addEventListener('change', timeOutSelect);

  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    setDisableAttribute: setDisableAttribute,
    removeDisableAttribute: removeDisableAttribute
  };
})();
