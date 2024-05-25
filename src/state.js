import { items, chests, dungeons, keyShops, setTrackables } from './trackables.js';

/**
 * Save and load the state of the tracker with local storage.
 */

const TRACKABLES_KEY = 'trackables';
const STYLES_KEY = 'styles';

/**
 * Save settings to local storage
 */
export function saveState() {
  saveTrackables();
  saveStyles();
}

export function loadState() {
  loadTrackables();
  loadStyles();
}

export function resetState() {
  window.localStorage.removeItem(TRACKABLES_KEY);
  window.localStorage.removeItem(STYLES_KEY);
  window.location.reload();
}

export function showResetModal() {
  const resetPrompt = /** @type {HTMLDialogElement} */ (document.getElementById('resetPrompt'));
  resetPrompt.showModal();
}

function saveTrackables() {
  const trackables = {
    items: items,
    chests: chests,
    dungeons: dungeons,
    keyShops: keyShops,
  };

  window.localStorage.setItem(TRACKABLES_KEY, JSON.stringify(trackables));
}

function saveStyles() {
  const groups = ['#items > div', '#gear > div', '#dungeons > div', '#mapLW > div', '#mapDW > div'];
  const selector = groups.join(', ');
  const styledDivs = $(selector)
    .filter(function (index, div) {
      return Boolean(div.id);
    })
    .toArray();

  const styles = styledDivs.map(function (div) {
    return {
      id: div.id,
      class: div.className,
      style: div.style.cssText,
    };
  });

  window.localStorage.setItem(STYLES_KEY, JSON.stringify(styles));
}

function loadStyle(style) {
  const results = $('#' + style.id);
  if (!results || !results.length) {
    return;
  }

  const div = results[0];
  div.className = style.class;
  div.style.cssText = style.style;
}

function loadStyles() {
  const styles = JSON.parse(window.localStorage.getItem(STYLES_KEY));
  if (styles) {
    styles.forEach(loadStyle);
  }
}

function loadTrackables() {
  const trackables = JSON.parse(window.localStorage.getItem(TRACKABLES_KEY));
  if (trackables) {
    setTrackables(trackables);
  }
}
