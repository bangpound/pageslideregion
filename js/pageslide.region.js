/*global Drupal:false */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, jquery:true, indent:2, maxerr:50, white:true */
(function ($) {

  Drupal.behaviors.pageSlideRegion = {
    attach: function (context, settings) {
      var $region = $('#pageslideregion', context),
        $accordion = $('#pageslideregion > div'),
        padding = $('body').css('paddingTop'),
        options = {
          navigation: true,
          navigationFilter: function () {
            return this.hash.toLowerCase() === ('#' + $.cookie('_pageSlideRegion'));
          },
          fillSpace: true,
          header: '.block-title',
          change: function (event, ui) {
            if ($(ui.options.header, this).index(ui.newHeader) === $(ui.options.header, this).index(ui.oldHeader)) {
              $.cookie('_pageSlideRegion', false);
            } else {
              $.cookie('_pageSlideRegion', ui.newHeader.attr('id'));
            }
          },
          create: function (event, ui) {
            $('body').css('marginLeft', $(this).width());
          }
        };

      $region.css({
        position: 'fixed',
        top: padding,
        left: 0,
        bottom: 0,
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
            $region.show('slide', function () {
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
            $region.resizable('destroy').hide('slide', function() {
              $accordion.accordion('destroy');
            });
            $('body').css('marginLeft', 'auto');
          }
        });
    }
  };

})(jQuery);
