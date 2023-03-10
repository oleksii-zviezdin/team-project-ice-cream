!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelectorAll('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close'),
    body = document.querySelector('body');

  /* Перебираем массив кнопок */
  modalButtons.forEach(function (item) {
    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener('click', function (e) {
      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
      e.preventDefault();

      /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.overlay[data-modal="' + modalId + '"]'
        );
      /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
      modalElem.classList.add('active');
      body.classList.add('no-scroll');
    }); // end click
  }); // end foreach

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.overlay');

      parentModal.classList.remove('active');
      body.classList.remove('no-scroll');
      player.pauseVideo();
    });
  }); // end foreach

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document.querySelector('.overlay.active').classList.remove('active');
        document.querySelector('body').classList.remove('no-scroll');
        player.pauseVideo();
      }
    },
    false
  );

  overlay.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        ),
        withinBoundaries = e.composedPath().includes(modalElem);

      if (!withinBoundaries) {
        document.querySelector('.overlay.active').classList.remove('active');
        document.querySelector('body').classList.remove('no-scroll');
        player.pauseVideo();
      }
    });
  }); // end foreach

  // overlay.forEach(function (item) {
  //   item.addEventListener('click', function (e) {
  //     var parentModal = this.closest('.overlay');

  //     parentModal.classList.remove('active');
  //     body.classList.remove('no-scroll');
  //   });
  // }); // end foreach

  // overlay.addEventListener('click', function () {
  //   document.querySelector('.overlay.active').classList.remove('active');
  //   document.querySelector('body').classList.remove('no-scroll');
  // });
}); // end ready
