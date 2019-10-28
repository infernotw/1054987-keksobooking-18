'use strict';

(function () {
  function getErrorMessage(errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');
    var errorButton = errorElement.querySelector('.error__button');

    /**
     * закрытие окна с ошибкой
     * @param {Object} evt
     */
    function closeError(evt) {
      // проверка наличия keyCode.ESC
      // если есть, то перезагрузка страницы не происходит
      if (evt.keyCode === window.card.KEY_CODES.ESC) {
        main.removeChild(errorElement);
      } else {
        document.location.reload();
        main.removeChild(errorElement);
      }
    }

    errorButton.addEventListener('click', closeError);
    document.addEventListener('mousedown', closeError);
    document.addEventListener('keydown', onErrorEsc);

    /**
     * закрытие окна по нажатию на клавишу ESC
     * @param {Object} evt
     */
    function onErrorEsc(evt) {
      window.card.onEscDown(evt, closeError);
    }

    errorElement.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(errorElement);

    errorButton.focus();
  }

  window.error = {
    getErrorMessage: getErrorMessage
  };
})();
