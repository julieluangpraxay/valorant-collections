/* exported data */
let data = {
  sprays: [],
  favorites: [],
  view: 'favorites-page'
};

window.addEventListener('beforeunload', function (event) {
  const favoritesJSON = JSON.stringify(data.favorites);
  localStorage.setItem('favoriteSprays', favoritesJSON);
});
const previousFavoritesJSON = localStorage.getItem('favoriteSprays');

if (previousFavoritesJSON !== null) {
  data.favorites = JSON.parse(previousFavoritesJSON);
}
