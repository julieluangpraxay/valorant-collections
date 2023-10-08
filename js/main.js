const $bannerCarousel = document.querySelectorAll('.banner');

let currentBannerIndex = 0;

function carousel() {
  for (let i = 0; i < $bannerCarousel.length; i++) {
    $bannerCarousel[i].classList.add('hidden');
  }
  $bannerCarousel[currentBannerIndex].classList.remove('hidden');
  currentBannerIndex++;

  if (currentBannerIndex >= $bannerCarousel.length) {
    currentBannerIndex = 0;
  }
}

setInterval(carousel, 3000);

const $cardContainer = document.querySelector('.card-container');

function isFavorite(sprayName) {
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].name === sprayName) {
      return true;
    }
  }
  return false;
}

function getSkinsData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/sprays');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $cardContainer.innerHTML = ' ';

    for (let i = 0; i < xhr.response.data.length; i++) {
      if (xhr.response.data[i].fullTransparentIcon !== null) {
        data.sprays.push(xhr.response.data[i]);

        const $cardWrapper = document.createElement('div');
        const $iconImage = document.createElement('img');
        const $textWrapper = document.createElement('div');
        const $sprayTitle = document.createElement('p');
        const $imgWrapper = document.createElement('div');
        const $imgRow = document.createElement('div');

        if (xhr.response.data[i].animationGif !== null) {
          $iconImage.src = xhr.response.data[i].animationGif;
          $iconImage.setAttribute('alt', 'Animated Valorant Spray Gif');
        } else {
          $iconImage.src = xhr.response.data[i].fullTransparentIcon;
          $iconImage.setAttribute('alt', 'Valorant Spray Image');
        }

        const $heart = document.createElement('i');
        const sprayName = xhr.response.data[i].displayName;

        if (isFavorite(sprayName)) {
          $heart.classList.add('fa-solid', 'fa-heart', 'fa-2xl', 'image-heart');
        } else {
          $heart.classList.add(
            'fa-regular',
            'fa-heart',
            'fa-2xl',
            'image-heart'
          );
        }

        $imgRow.classList.add('img-row');
        $imgWrapper.classList.add('img-wrapper');
        $cardWrapper.classList.add('card-wrapper');
        $iconImage.classList.add('spray-icon');
        $textWrapper.classList.add('text-wrapper');
        $sprayTitle.classList.add('spray-title');
        $sprayTitle.textContent = xhr.response.data[i].displayName;

        $cardContainer.appendChild($cardWrapper);
        $cardWrapper.appendChild($imgWrapper);
        $imgWrapper.appendChild($imgRow);
        $imgRow.appendChild($heart);
        $imgWrapper.appendChild($iconImage);
        $cardWrapper.appendChild($textWrapper);
        $textWrapper.appendChild($sprayTitle);

        $heart.addEventListener('click', function (event) {
          $heart.classList.remove('fa-regular');
          $heart.classList.add('fa-solid', 'fa-heart');

          const clickedHeart = event.target;
          const cardContainer = clickedHeart.closest('.card-wrapper');
          const $imgWrapper = clickedHeart.closest('.img-wrapper');
          const closestImg = $imgWrapper.lastChild.getAttribute('src');
          const closestSprayName =
            cardContainer.lastChild.firstChild.textContent;

          const sprayObj = {
            image: closestImg,
            name: closestSprayName
          };
          data.favorites.push(sprayObj);
        });
      }
    }
  });
  xhr.send();
}

getSkinsData();

const $searchBar = document.querySelector('.search');

$searchBar.addEventListener('input', searchSprays);

function searchSprays(event) {
  event.preventDefault();
  const searchTerm = $searchBar.value.toLowerCase();
  $cardContainer.innerHTML = ' ';

  for (let i = 0; i < data.sprays.length; i++) {
    const spray = data.sprays[i];
    const sprayName = spray.displayName.toLowerCase();
    if (
      searchTerm === '' ||
      (sprayName.includes(searchTerm) && spray.fullTransparentIcon !== null)
    ) {
      const $cardWrapper = document.createElement('div');
      const $iconImage = document.createElement('img');
      const $textWrapper = document.createElement('div');
      const $sprayTitle = document.createElement('p');
      const $imgWrapper = document.createElement('div');
      const $imgRow = document.createElement('div');

      $sprayTitle.textContent = spray.displayName;
      $iconImage.src = spray.animationGif || spray.fullTransparentIcon;
      $iconImage.setAttribute('alt', 'Valorant Spray Image');

      const $heart = document.createElement('i');
      const sprayName = spray.displayName;

      if (isFavorite(sprayName)) {
        $heart.classList.add('fa-solid', 'fa-heart', 'fa-2xl', 'image-heart');
      } else {
        $heart.classList.add('fa-regular', 'fa-heart', 'fa-2xl', 'image-heart');
      }

      $imgRow.classList.add('img-row');
      $imgWrapper.classList.add('img-wrapper');
      $cardWrapper.classList.add('card-wrapper');
      $iconImage.classList.add('spray-icon');
      $textWrapper.classList.add('text-wrapper');
      $sprayTitle.classList.add('spray-title');

      $cardContainer.appendChild($cardWrapper);
      $cardWrapper.appendChild($imgWrapper);
      $imgWrapper.appendChild($imgRow);
      $imgRow.appendChild($heart);
      $imgWrapper.appendChild($iconImage);
      $cardWrapper.appendChild($textWrapper);
      $textWrapper.appendChild($sprayTitle);

      $heart.addEventListener('click', function (event) {
        $heart.classList.remove('fa-regular');
        $heart.classList.add('fa-solid', 'fa-heart');

        const clickedHeart = event.target;
        const cardContainer = clickedHeart.closest('.card-wrapper');
        const $imgWrapper = clickedHeart.closest('.img-wrapper');
        const closestImg = $imgWrapper.lastChild.getAttribute('src');
        const closestSprayName = cardContainer.lastChild.firstChild.textContent;

        const sprayObj = {
          image: closestImg,
          name: closestSprayName
        };
        data.favorites.push(sprayObj);
      });
    }
  }
}

const $hamburgerMobile = document.querySelector('.fa-bars');
const $mobile = document.querySelector('#sideNav');

$hamburgerMobile.addEventListener('click', function (event) {
  $mobile.classList.remove('hidden');
});

const $close = document.querySelector('.fa-xmark');

$close.addEventListener('click', function (event) {
  $mobile.classList.add('hidden');
});

function renderSprays(spray) {
  const $cardWrapper = document.createElement('div');
  const $iconImage = document.createElement('img');
  const $textWrapper = document.createElement('div');
  const $sprayTitle = document.createElement('p');
  const $imgWrapper = document.createElement('div');
  const $imgRow = document.createElement('div');

  $sprayTitle.textContent = spray.name;
  $iconImage.src = spray.image;
  $iconImage.setAttribute('alt', 'Valorant Spray Image');

  const $heart = document.createElement('i');
  $heart.classList.add('fa-solid', 'fa-heart', 'fa-2xl', 'image-heart');
  $imgRow.classList.add('img-row');
  $imgWrapper.classList.add('img-wrapper');
  $cardWrapper.classList.add('card-wrapper');
  $iconImage.classList.add('spray-icon');
  $textWrapper.classList.add('text-wrapper');
  $sprayTitle.classList.add('spray-title');

  $cardWrapper.appendChild($imgWrapper);
  $imgWrapper.appendChild($imgRow);
  $imgRow.appendChild($heart);
  $imgWrapper.appendChild($iconImage);
  $cardWrapper.appendChild($textWrapper);
  $textWrapper.appendChild($sprayTitle);

  return $cardWrapper;
}

const $ul = document.querySelector('ul');

const $favoritesPage = document.querySelector('.favorites-page');
const $spraysPage = document.querySelector('.sprays-page');
const $favoritesNavButton = document.querySelector('.favorite-nav-button');
const $spraysButton = document.querySelector('.sprays-nav-button');
const $homeButton = document.querySelector('.home-button');
const $searchSection = document.querySelector('.search-wrapper');
const $carouselWrapper = document.querySelector('.carousel-wrapper');

function viewSwap(viewName) {
  if (viewName === 'favorites-page') {
    data.view = 'favorites-page';
    $favoritesPage.classList.remove('hidden');
    $spraysPage.classList.add('hidden');
  } else {
    data.view = 'sprays-page';
    $favoritesPage.classList.add('hidden');
    $spraysPage.classList.remove('hidden');
  }
}

$homeButton.addEventListener('click', function (event) {
  viewSwap('sprays-page');
  $favoritesPage.classList.add('hidden');
  $searchSection.classList.remove('hidden');
  $carouselWrapper.classList.remove('hidden');
});

$spraysButton.addEventListener('click', function (event) {
  viewSwap('sprays-page');
  $favoritesPage.classList.add('hidden');
  $searchSection.classList.remove('hidden');
  $carouselWrapper.classList.remove('hidden');
});

const $noFavsText = document.querySelector('.no-favs-text');

$favoritesNavButton.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('favorites-page');
  $searchSection.classList.add('hidden');
  $carouselWrapper.classList.add('hidden');
  if (data.favorites.length === 0) {
    $noFavsText.classList.remove('hidden');
  } else {
    $ul.replaceChildren();

    for (let i = 0; i < data.favorites.length; i++) {
      $ul.append(renderSprays(data.favorites[i]));
      $carouselWrapper.classList.add('hidden');
      $searchSection.classList.add('hidden');
    }
  }
});
