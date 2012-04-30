/*global Drupal:false */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, jquery:true, indent:2, maxerr:50, white:true */
(function ($) {

  Drupal.behaviors.pageSlideRegion = {
    attach: function (context, settings) {
      var $region = $('#pageslideregion', context),
        $accordion = $('#pageslideregion > div'),
        paddingTop = parseInt($('body').css('paddingTop'), 10) + parseInt($('body').css('marginTop'), 10),
        paddingBottom = parseInt($('body').css('paddingBottom'), 10) + parseInt($('body').css('marginBottom'), 10),
        options = {
          navigation: true,
          navigationFilter: function () {
            return this.hash.toLowerCase() === $.cookie('_pageSlideRegion');
          },
          fillSpace: true,
          header: '.block-title',
          change: function (event, ui) {
            if ($(ui.options.header, this).index(ui.newHeader) === $(ui.options.header, this).index(ui.oldHeader)) {
              $.cookie('_pageSlideRegion', false);
            } else {
              $.cookie('_pageSlideRegion', $('a', ui.newHeader).attr('href'));
            }
          },
          create: function (event, ui) {
            $('body').css('marginLeft', $(this).width());
          }
        };

      $region.css({
        position: 'fixed',
        top: paddingTop || 0,
        left: 0,
        bottom: paddingBottom || 0,
        zIndex: 499,
        width: '260px',
        backgroundColor: '#ffffff'
      }).hide();

      $('<button>Sidebar</button>', context)
        .prependTo('body')
        .button()
        .click(function () {
          var state = $region.is(':hidden');

          if (state) {
            $region.show('slide', {direction: 'left'}, function () {
              $accordion.accordion('resize');
            });
            $accordion.accordion(options);
            $region.resizable({
              handles: 'e',
              resize: function (event, ui) {
                $('body').css('marginLeft', ui.size.width);
              }
            });
          } else {
            $region.resizable('destroy').hide('slide', {direction: 'left'}, function() {
              $accordion.accordion('destroy');
            });
            $('body').css('marginLeft', 'auto');
          }
        });
    }
  };

})(jQuery);
