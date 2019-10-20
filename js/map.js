'use strict';

(function () {
  var mapMain = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var isActivate = false;
  var addressInput = window.form.adForm.querySelector('#address');

  function onLoadSuccess(data) {
    mapPins.appendChild(window.pin.createPins(data));
  }

  var onLoadError = function (errorText) {
    window.utils.getErrorMessage(errorText);
  };

  /**
   * параметры страницы при ее активации
   */
  function activatePage() {
    window.map.mapMain.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.adFormFieldsets.forEach(window.form.removeDisableAttribute);
    mapFiltersSelect.forEach(window.form.removeDisableAttribute);
  }

  mapFiltersSelect.forEach(window.form.setDisableAttribute);

  /**
   * однократная активация по клику мыши
   */
  function enablePageByMouse() {
    if (!isActivate) {
      isActivate = true;
      activatePage();
      window.backend.load(onLoadSuccess, onLoadError);
    }
    window.map.writeAddress();
  }

  /**
   * однократная активация при фокусе c клавиатуры
   * @param {Object} evt
   */
  function enablePageByKey(evt) {
    if (!isActivate) {
      if (evt.keyCode === window.card.keycode.ENTER) {
        isActivate = true;
        activatePage();
        window.backend.load(onLoadSuccess, onLoadError);
      }
    }
    window.map.writeAddress();
  }

  window.pin.mapPinMain.addEventListener('mousedown', enablePageByMouse);
  window.pin.mapPinMain.addEventListener('keydown', enablePageByKey);

  // изначальные координаты метки в неактивном состоянии карты
  addressInput.value = Math.round(window.pin.mapPinMain.offsetLeft + window.pin.mapPinMain.offsetWidth / 2) + ', ' + Math.round(window.pin.mapPinMain.offsetTop + window.pin.mapPinMain.offsetHeight / 2);

  /**
   * определение координат метки при активном состоянии карты
   */
  function writeAddress() {
    addressInput.value = Math.round(window.pin.mapPinMain.offsetLeft + window.pin.pinParams.MAIN_SIZE_WIDTH / 2) + ', ' + Math.round(window.pin.mapPinMain.offsetTop + window.pin.pinParams.MAIN_SIZE_HEIGHT);
  }

  // перемещение метки
  window.pin.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * функция перемещения метки при движении мышкой с кликом
     * @param {Object} evtMove - объект при перемещении
     */
    function onMouseMove(evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      // задаю границы перемещения метки по оси X
      var x = window.pin.mapPinMain.offsetLeft - shift.x;
      if (x < 0) {
        x = 0;
      } else if (x > (mapMain.clientWidth - window.pin.pinParams.MAIN_SIZE_WIDTH)) {
        x = (mapMain.clientWidth - window.pin.pinParams.MAIN_SIZE_WIDTH);
      }

      // задаю границы перемещения метки по оси Y
      var y = window.pin.mapPinMain.offsetTop - shift.y;
      if (y < (window.pin.pinParams.MIN_Y - window.pin.pinParams.MAIN_SIZE_HEIGHT)) {
        y = window.pin.pinParams.MIN_Y - window.pin.pinParams.MAIN_SIZE_HEIGHT;
      } else if (y > (window.pin.pinParams.MAX_Y - window.pin.pinParams.MAIN_SIZE_HEIGHT)) {
        y = window.pin.pinParams.MAX_Y - window.pin.pinParams.MAIN_SIZE_HEIGHT;
      }

      window.pin.mapPinMain.style.left = x + 'px';
      window.pin.mapPinMain.style.top = y + 'px';

      writeAddress();
    }

    /**
     * функция отмены возможности перемещения при отпущенной клавише мыши
     * @param {Object} evtUp
     */
    function onMouseUp(evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mapPins: mapPins,
    mapMain: mapMain,
    writeAddress: writeAddress
  };
})();
