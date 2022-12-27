$('.count').each(function () {
  $(this)
    .prop('Counter', 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 3000,
        easing: 'linear',
        step: function (now) {
          $(this).text(Math.ceil(now));
        },
      }
    );
});
