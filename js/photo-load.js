'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoPreviewImg = document.querySelectorAll('.ad-form__photo img');
  var MUFFIN_PHOTO = 'img/muffin-grey.svg';
  var photoParams = {
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  // добавляю фотографию (для карты) при нажатии
  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matchesAvatar = FILE_TYPES.some(function (it) {
      return avatarName.endsWith(it);
    });

    if (matchesAvatar) {
      var avatarReader = new FileReader();

      avatarReader.addEventListener('load', function () {
        avatarPreview.src = avatarReader.result;
      });

      avatarReader.readAsDataURL(avatar);
    }
  });

  // добавляю фотографии жилья с множественным превью
  photoChooser.addEventListener('change', function () {
    var photos = photoChooser.files;

    var photosArray = Array.from(photos);

    photosArray.forEach(function (photo) {
      var photosName = photos.name.toLowerCase();

      var matchesPhotos = FILE_TYPES.some(function (it) {
        return photosName.endsWith(it);
      });

      if (matchesPhotos) {
        renderPhotos(photo);
      }
    });
  });

  /**
   * создаю отображение раздела фотографий жилья
   * @param {any} photos
   */
  function renderPhotos(photos) {
    var photoReader = new FileReader();

    photoReader.addEventListener('load', function () {
      var image = document.createElement('img');
      image.src = photoReader.result;

      image.style.width = photoParams.WIDTH;
      image.style.height = photoParams.HEIGHT;

      photoPreview.appendChild(image);
    });

    photoReader.readAsDataURL(photos);
  }

  /**
   * удаление фотографий
   */
  function removePhotos() {
    if (avatarPreview.src !== MUFFIN_PHOTO) {
      avatarPreview.src = MUFFIN_PHOTO;
    }

    if (photoPreviewImg) {
      photoPreview.innerHTML = '';
    }
  }

  window.photoLoad = {
    removePhotos: removePhotos
  };
})();
