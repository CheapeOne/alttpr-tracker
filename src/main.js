import { layout, settings } from './layout.js';
import { loadState } from './state.js';
import { stats } from './stats.js';
import { map, toggle } from './trackables.js';

// TODO:
// - add onclick handlers to window somewhere (here?)
// - reorg code that interacts with the window to one place (layout / view ?)
// - layout.js -> map.js ?
// - handle remaining typeerrors (timer.js)
// - resize better on mobile

function main() {
  $(window).load(function () {
    layout.sizeMap($("input[name='mapAlign']:checked").val()); //arranges the maps to best fit on screen
    map.populate(); //adds dungeons and chest icons to the maps
    settings.applyCookie(); //applies saved user settings, or defaults if no cookie found
    stats.fetch();
    loadState();
  });

  $(window).resize(function () {
    layout.sizeMap($("input[name='mapAlign']:checked").val()); //re-arranges the maps if window size changes
  });

  $('.icon,input').hover(
    function () {
      $(this).attr('tooltip-data', $(this).attr('title'));
      $(this).removeAttr('title');
      $('#caption').html($(this).attr('tooltip-data'));
    },
    function () {
      $(this).attr('title', $(this).attr('tooltip-data'));
      $(this).removeAttr('tooltip-data');
      $('#caption').html('');
    }
  );

  $('.icon').hover(
    function () {
      stats.find(this);
    },
    function () {
      if (settings.predictor == 0) {
        stats.clear();
      } else {
        stats.find('boss10');
      }
    }
  );

  $('.icon').mousedown(function (event) {
    //adds listener for right-click on icons
    if (event.which == 3) {
      toggle.icon(this, true);
    }
  });

  $('#timer').mousedown(function (event) {
    //adds listener for right-click on icons
    if (event.which == 3) {
      resetTimer();
    }
  });
}

main();
