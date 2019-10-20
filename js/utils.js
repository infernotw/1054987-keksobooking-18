'use strict';

(function () {
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

  /**
   * склонение слов
   * @param {number} num - число, в зависимости от которого будем склонять
   * @param {array} expressions - массив
   * @return {string}
   */
  function declension(num, expressions) {
    var result;
    var count = num % 100;
    if (count >= 5 && count <= 20) {
      result = expressions['2'];
    } else {
      count = count % 10;
      if (count === 1) {
        result = expressions['0'];
      } else if (count >= 2 && count <= 4) {
        result = expressions['1'];
      } else {
        result = expressions['2'];
      }
    }
    return result;
  }

  window.utils = {
    shuffleArray: shuffleArray,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    declension: declension
  };
})();
