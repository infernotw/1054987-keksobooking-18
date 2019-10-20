'use strict';

(function () {
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
      MAX: 1000000
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
   * @return {Object} - карточка предложения со всей информацией о нем
   */
  function getRandomOffer(i) {
    var locationX = window.utils.getRandomNumber(0 + window.pin.pinParams.OFFER_SIZE_WIDTH, window.map.mapMain.clientWidth - window.pin.pinParams.OFFER_SIZE_WIDTH);
    var locationY = window.utils.getRandomNumber(window.pin.pinParams.MIN_Y, window.pin.pinParams.MAX_Y);
    var closerOffer = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: window.utils.getRandomElement(offerOptions.TITLE),
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNumber(offerOptions.PRICE.MIN, offerOptions.PRICE.MAX),
        type: offerOptions.TYPES[window.utils.getRandomNumber(1, offerOptions.TYPES.length)].value,
        rooms: window.utils.getRandomNumber(offerOptions.ROOMS.MIN, offerOptions.ROOMS.MAX),
        guests: window.utils.getRandomNumber(offerOptions.GUESTS.MIN, offerOptions.GUESTS.MAX),
        checkin: offerOptions.TIMESIN[window.utils.getRandomNumber(0, offerOptions.TIMESIN.length)].value,
        checkout: offerOptions.TIMESOUT[window.utils.getRandomNumber(0, offerOptions.TIMESOUT.length)].value,
        features: window.utils.shuffleArray(offerOptions.FEATURES),
        description: window.utils.getRandomElement(offerOptions.DESCRIPTION),
        photos: window.utils.shuffleArray(offerOptions.PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    return closerOffer;
  }

  window.data = {
    getRandomOffer: getRandomOffer
  };
})();
