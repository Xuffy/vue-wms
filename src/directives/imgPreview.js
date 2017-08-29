/**
 * 预览大图
 */
export default {
  bind: function (el, binding) {
    !$(el).attr('title') && $(el).attr({'title': '点击查看原图','alt':'图片加载失败'});

    $(el).on('click', function () {
      let boxEl = $('<div class="dx-preview-box"></div>');

      boxEl.append('<img src="' + binding.value + '"/>');

      $('body').append(boxEl);

      boxEl.on('click', function () {
        boxEl.unbind('click');
        $(this).remove();
      });

    });
  }
}
