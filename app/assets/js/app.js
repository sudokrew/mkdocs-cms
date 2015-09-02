$(function() {
  $('#side-menu').metisMenu();
  $('#sortable').sortable();

  
  $('.editor').each( function() {
    new SimpleMDE({
      element: this,
      spellchecker: true,
      lineWrapping: true,
      indentWithTabs: true,
      tabSize: 4,
      initialValue: $('.editor-value').attr('data'),
      autosave: {
        enabled: true,
        unique_id: $(this).attr('id'),
        delay: 10000
      }
    });
  });


  /**
   * Adjustment to allow simpleMDE to go full-screen.
   */
  $('.fa-arrows-alt').click( function() {
    $('#navigation').toggle();
  });


  /**
   * Formats the pages to be ordered on submit
   */
  $('#order-form').submit(function(e) {
    var pages = [];
    e.preventDefault();

    $('.list-group-item').each(function() {
      var page = {};
      page[$(this).attr('page')] = $(this).attr('path');
      pages.push(page);
    });

    $.post($(this).attr('action'), { pages: pages })
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


  /**
   * Loads the correct sidebar on window load,
   * collapsing the sidebar on window resize.
   * Setting the min-height of #page-wrapper to window size.
   */
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
