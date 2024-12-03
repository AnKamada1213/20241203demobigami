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

  
// PageTop と Line ボタンの表示/非表示制御
function PageTopAnime() {
  const scroll = $(window).scrollTop();
  const documentHeight = $(document).height();
  const windowHeight = $(window).height();
  const offset = 200;

  if (scroll >= window.innerHeight) {
    // 最初のスクロール以降に表示
    $('#page-top').removeClass('Hidden DownMove FadeOut').addClass('UpMove');
    $('#line').removeClass('Hidden DownMove FadeOut').addClass('UpMove');
    $('#instagram').removeClass('Hidden DownMove FadeOut').addClass('UpMove');
  } else {
    // 初期スクロールが行われるまで非表示
    $('#page-top').addClass('Hidden');
    $('#line').addClass('Hidden');
    $('#instagram').addClass('Hidden');
  }

  if (scroll > documentHeight - windowHeight - offset) {
    // ページの一番下付近でフェードアウト
    $('#page-top').removeClass('UpMove').addClass('FadeOut');
    $('#line').removeClass('UpMove').addClass('FadeOut');
    $('#instagram').removeClass('UpMove').addClass('FadeOut');
  } else {
    // フェードアウト解除
    $('#page-top').removeClass('FadeOut');
    $('#line').removeClass('FadeOut');
    $('#instagram').removeClass('FadeOut');
  }
}

// 初期状態で非表示設定
$(document).ready(function () {
  PageTopAnime();
});

// スクロールイベント
$(window).scroll(PageTopAnime);

// ページトップボタンのクリックでスムーズスクロール
$('#page-top a').click(function () {
  $('html, body').animate({
    scrollTop: 0
  }, 600);
  return false;
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
