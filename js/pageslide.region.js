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
      $('.region-pageslideregion', context)
        .once('pageSlideRegion', Drupal.pageSlideRegion.init);

      // Toggling pageSlideRegion drawer.
      $('#pageslideregion-toggle a', context).once('pageSlideRegion-toggle').click(function (e) {
        Drupal.pageSlideRegion.toggle();
        $(this).toggleClass('active');
        // Allow resize event handlers to recalculate sizes/positions.
        $(window).triggerHandler('resize');
        return false;
      });
      Drupal.pageSlideRegion.accordion.accordion('enable');
      Drupal.pageSlideRegion.accordion.accordion('resize');
    }
  };

  /**
   * Retrieve last saved cookie settings and set up the initial pageSlideRegion state.
   */
  Drupal.pageSlideRegion.init = function () {

    $('body').children().wrapAll('<div id="pageslideregion-wrapper"></div>');

    var $region = $(this).insertAfter($('#pageslideregion-wrapper')),
      $accordion = $region.children().wrapAll('<div>').parent('div'),
      paddingTop = parseInt($('body').css('paddingTop'), 10) + parseInt($('body').css('marginTop'), 10),
      paddingBottom = parseInt($('body').css('paddingBottom'), 10) + parseInt($('body').css('marginBottom'), 10),
      options = {
        navigation: true,
        navigationFilter: function () {
          return this.hash.toLowerCase() === $.cookie('_pageSlideRegion');
        },
        fillSpace: true,
        duration: 250,
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

    Drupal.pageSlideRegion.accordion = $accordion.accordion(options);
  };

  /**
   * Toggle the pageSlideRegion.
   */
  Drupal.pageSlideRegion.toggle = function () {
    $('body').toggleClass('pageslideregion-active');
    if ($('body').hasClass('pageslideregion-active')) {
      Drupal.pageSlideRegion.accordion.accordion('disable');
      Drupal.pageSlideRegion.accordion.accordion('enable');
      Drupal.pageSlideRegion.accordion.accordion('resize');
    }
  };

})(jQuery);
