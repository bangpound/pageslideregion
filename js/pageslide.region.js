/*global Drupal:false */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, jquery:true, indent:2, maxerr:50, white:true */
(function ($) {

  Drupal.pageSlideRegion = Drupal.pageSlideRegion || {};

  /**
   * Attach toggling behavior and notify the overlay of the pageSlideRegion.
   */
  Drupal.behaviors.pageSlideRegion = {
    attach: function (context, settings) {

      // Set the initial state of the pageSlideRegion.
      $('#pageslideregion', context)
        .insertAfter($('#page'))
        .once('pageSlideRegion', Drupal.pageSlideRegion.init);

      $('#pageslideregion,#page', context).wrapAll('<div id="pageslideregion-wrapper"></div>');

      // Toggling pageSlideRegion drawer.
      $('#pageslideregion-toggle a', context).once('pageSlideRegion-toggle').click(function (e) {
        Drupal.pageSlideRegion.toggle();
        $(this).toggleClass('active');
        // Allow resize event handlers to recalculate sizes/positions.
        $(window).triggerHandler('resize');
        return false;
      });
    }
  };

  /**
   * Retrieve last saved cookie settings and set up the initial pageSlideRegion state.
   */
  Drupal.pageSlideRegion.init = function () {

    var $region = $(this),
      $accordion = $region.children('div'),
      paddingTop = parseInt($('body').css('paddingTop'), 10) + parseInt($('body').css('marginTop'), 10),
      paddingBottom = parseInt($('body').css('paddingBottom'), 10) + parseInt($('body').css('marginBottom'), 10),
      // Retrieve the collapsed status from a stored cookie.
      collapsed = parseInt($.cookie('Drupal.pageSlideRegion.collapsed'), 10),
      options = {
        navigation: true,
        navigationFilter: function () {
          return this.hash.toLowerCase() === $.cookie('_pageSlideRegion');
        },
        fillSpace: true,
        header: '.block-title',
        change: function (event, ui) {
          if ($(ui.options.header, this).index(ui.newHeader) === $(ui.options.header, this).index(ui.oldHeader)) {
            $.cookie('_pageSlideRegion', false, {
              path: Drupal.settings.basePath,
              expires: 36500
            });
          } else {
            $.cookie('_pageSlideRegion', $('a', ui.newHeader).attr('href'), {
              path: Drupal.settings.basePath,
              expires: 36500
            });
          }
        }
      };

    $region.css({
      height: ($region.height() - paddingTop - paddingBottom) + 'px',
      top: paddingTop || 0,
      bottom: paddingBottom || 0
    });

    $accordion.accordion(options);

    // Expand or collapse the pageSlideRegion based on the cookie value.
    if (!collapsed) {
      $('body').addClass('pageslideregion-active');
      $('#pageslideregion-toggle a').addClass('active');
    }
  };

  /**
   * Toggle the pageSlideRegion.
   */
  Drupal.pageSlideRegion.toggle = function () {
    $('body').toggleClass('pageslideregion-active');
    $.cookie(
      'Drupal.pageSlideRegion.collapsed',
      $('body').hasClass('pageslideregion-active') ? 0 : 1,
      {
        path: Drupal.settings.basePath,
        // The cookie should "never" expire.
        expires: 36500
      }
    );
  };

})(jQuery);
