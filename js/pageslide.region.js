/*global Drupal:false */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, jquery:true, indent:2, maxerr:50, white:true */
(function ($) {

  Drupal.behaviors.pageSlideRegion = {
    attach: function (context, settings) {
      $('#pageslideregion', context).css({ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 499, width: '260px', backgroundColor: '#ffffff' }).hide();
      $('<button>Sidebar</button>', context).prependTo('body').button().click(function () {
				var state = $('#pageslideregion').is(':hidden');

        if (state) {
          $('#pageslideregion').show(0, function () {

            $('> div', this).accordion({
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
            });
          }).resizable({
            handles: 'e',
            resize: function (event, ui) {
              $('body').css('marginLeft', ui.size.width);
            }
          });
        } else {
          $('#pageslideregion > div').accordion('destroy');
          $('#pageslideregion').resizable('destroy').hide();
          $('body').css('marginLeft', 'auto');
        }
      });
    }
  };

})(jQuery);
