$(function () {
  // 初期表示時に DownMove クラスを追加
  $('#page-top').addClass('DownMove');
  $('#line').addClass('DownMove');

  // スムーススクロール
  $('a[href^="#"]').click(function (e) {
    if ($(this).closest('.tab').length) {
      return;
    }
    let href = $(this).attr("href");
    let target = $(href === "#" || href === "" ? "html" : href);
    let position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, 600, "swing");
    e.preventDefault();
  });

  // ハンバーガーメニュー
  $('.hamburger').on('click', function () {
    $('#header').toggleClass('open');
  });

  $('.sp-nav a').on('click', function () {
    $('#header').removeClass('open');
  });

  // PageTop と Line ボタン
  function PageTopAnime() {
    var scroll = $(window).scrollTop();
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var offset = 200;

    if (scroll >= window.innerHeight && scroll <= documentHeight - windowHeight - offset) {
      $('#page-top').removeClass('DownMove FadeOut').addClass('UpMove');
      $('#line').removeClass('DownMove FadeOut').addClass('UpMove');
      $('#instagram').removeClass('DownMove FadeOut').addClass('UpMove');

    } else if (scroll > documentHeight - windowHeight - offset) {
      $('#page-top').removeClass('UpMove').addClass('FadeOut');
      $('#line').removeClass('UpMove').addClass('FadeOut');
      $('#instagram').removeClass('UpMove').addClass('FadeOut');
    } else {
      $('#page-top').removeClass('UpMove FadeOut').addClass('DownMove');
      $('#line').removeClass('UpMove FadeOut').addClass('DownMove');
      $('#instagram').removeClass('UpMove FadeOut').addClass('DownMove');
    }
  }

  // 初期表示時に PageTopAnime 関数を実行
  PageTopAnime();

  $(window).scroll(PageTopAnime);

  $('#page-top a').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  // フェードインエフェクト
  function fadeInEffect(selector, offset) {
    $(selector).each(function () {
      let scroll = $(window).scrollTop();
      let target = $(this).offset().top;
      let windowHeight = $(window).height();
      if (scroll > target - windowHeight + offset) {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }
    });
  }

  // フェードイン効果を適用
  $(window).scroll(function () {
    fadeInEffect('.attempt_box', 150);
    fadeInEffect('.state_list_box', 300);
  });

  // アコーディオンエリア
  $('.qa_title').on('click', function () {
    var findElm = $(this).next(".qa_box");
    $(findElm).slideToggle();
    $(this).toggleClass('close');
  });

  $('.accordion-area li:first-of-type section').addClass("open");
  $(".open").each(function (index, element) {
    var Title = $(element).children('.qa_title');
    $(Title).addClass('close');
    var Box = $(element).children('.qa_box');
    $(Box).slideDown(500);
  });

  // ページリロード時の初期化
  var searchBox = '.search-box';
  var listItem = '.news_all_list_item';
  var hideClass = 'is-hide';
  var allBtn = 'input[name="all"]';

  if (window.performance && performance.navigation.type === 1) {
    $(searchBox + ' input').prop('checked', false);
    $(allBtn).prop('checked', true);
  }

  // 検索フィルター
  function search_filter() {
    $(listItem).removeClass(hideClass);

    if ($(allBtn).is(':checked')) {
      $(searchBox + ' input').prop('checked', false);
      return;
    }

    var searchData = get_selected_input_items();

    $(listItem).each(function () {
      var item = $(this);
      var itemData = get_setting_values_in_item(item);
      var check = searchData.some(tag => itemData.includes(tag));
      if (!check) {
        item.addClass(hideClass);
      }
    });

    if ($(listItem).not('.' + hideClass).length === 0) {
      if (!$('.disnone').length) {
        $('.news_all_list').append('<li class="disnone">表示する項目がありません</li>');
      }
    } else {
      $('.disnone').remove();
    }

    if (!$(searchBox + ' input').is(':checked')) {
      $(allBtn).prop('checked', true);
    } else {
      $(allBtn).prop('checked', false);
    }
  }

  function get_selected_input_items() {
    var checkedItems = [];
    $(searchBox + ' input:checked').each(function () {
      checkedItems.push($(this).val());
    });
    return checkedItems;
  }

  function get_setting_values_in_item(item) {
    return Object.values(item.data());
  }

  $(document).on('change', searchBox + ' input, ' + allBtn, function () {
    search_filter();
  });
});
