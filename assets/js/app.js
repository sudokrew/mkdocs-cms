$(function() {
  $('.editor').trumbowyg();
  $('.sortable').sortable();
  $('#side-menu').metisMenu();
  $('#accordion').disableSelection();
  $('.switch').bootstrapSwitch({ size: 'mini' });


  $('.clone-btn').click(function() {
    var id    = $(this).attr('data');
    var newId = Math.floor(Math.random() * 1000);
    var input = '<input id="switch' + newId + '" type="checkbox" class="switch" data="#panel' + newId + '">';

    $('#panel'+id).clone(true).appendTo('#accordion');

    $('.tab-module').last().find('.kill-switch').empty().append(input);
    $('.tab-module').last().attr('id', 'panel' + newId);
    $('.tab-module').last().find('.panel-collapse').attr('id', 'collapse'+newId);
    $('.tab-module').last().find('.collapse-toggle').attr('href','#collapse'+ newId).attr('aria-controls', '#collapse'+ newId);
    $('#switch'+newId).bootstrapSwitch({ size: 'mini' });
    $('#switch'+newId).on('switchChange.bootstrapSwitch', function(e, state) {
      var module = $('#panel'+newId);
      state? $(module).removeClass('remove-module') : $(module).addClass('remove-module');
    });

  });

  $('.switch').on('switchChange.bootstrapSwitch', function(e, state) {
    var module = $(this).attr('data');

    state? $(module).removeClass('remove-module') : $(module).addClass('remove-module');
  });

  $('#create-form').submit(function(e) {
    $('.remove-module').remove();
  });


  $('ol.nested-sortable').nestedSortable({
    handle: 'div',
    items: 'li',
    tabSize: 15,
    tolerance: 'pointer',
    toleranceElement: '> div',
    protectRoot: true,
    maxLevels: 4,
    isTree: true
  });

  $('#order-form').submit(function(e) {
    e.preventDefault();
    
    var arr = [];

    $('.section').each(function() {
      var obj = {};
      var section = $(this).attr('data-section');
      obj[section] = [];

      $('.' + section.split(' ').join('.') + '.page').each(function() {
        var page = {};
        page[$(this).attr('data-page')] = $(this).attr('data-path');
        obj[section].push(page);
      });

      $('.' + section.split(' ').join('.') + '.sub-section').each(function() {
        var sub = {};
        var subSection = $(this).attr('data-sub-section');
        sub[subSection] = [];

        $('.' + subSection.split(' ').join('.') + '.page').each(function() {
          var page = {};
          page[$(this).attr('page')] = $(this).attr('path');
          sub[subSection].push(page);
        });

        obj[section].push(sub);
      });

      arr.push(obj);
    });

    $.post($(this).attr('action'), { pages: arr })
      .done(function(response) {
        var elem = '#order-response';

        $('html, body').animate({ scrollTop: 0 }, 'slow');
        $(elem).prepend(response).fadeIn();

        setTimeout(function() {
          $(elem).fadeOut();
          $(elem).html('');
        }, 3000);

      });
  });

  //Loads the correct sidebar on window load,
  //collapses the sidebar on window resize.
  // Sets the min-height of #page-wrapper to window size
  $(window).bind('load resize', function() {
    topOffset = 50;
    width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
    if (width < 768) {
      $('div.navbar-collapse').addClass('collapse');
      topOffset = 100; // 2-row-menu
    } else {
      $('div.navbar-collapse').removeClass('collapse');
    }

    height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
      $('#page-wrapper').css('min-height', (height) + 'px');
    }
  });

  var url = window.location;
  var element = $('ul.nav a').filter(function() {
    return this.href == url || url.href.indexOf(this.href) == 0;
  }).addClass('active').parent().parent().addClass('in').parent();
  if (element.is('li')) {
    element.addClass('active');
  }
});
