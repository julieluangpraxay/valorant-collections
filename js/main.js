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
          $iconImage.setAttribute('alt', 'Valorant Spray Iamge');
        }

        const $heart = document.createElement('i');
        if (data.favorites.includes(xhr.response.data[i].displayName)) {
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
          const closestSprayName = cardContainer.lastChild.firstChild.textContent;
          if (!data.favorites.includes(closestSprayName)) {
            data.favorites.push(closestSprayName);

          }

        });
      }
    }
  });
  xhr.send();
}

getSkinsData();

const $searchBar = document.querySelector('.search');

$searchBar.addEventListener('input', searchSprays);

function searchSprays() {
  event.preventDefault();
  const searchTerm = $searchBar.value.toLowerCase();
  $cardContainer.innerHTML = ' ';

  for (let i = 0; i < data.sprays.length; i++) {
    const spray = data.sprays[i];
    const sprayName = spray.displayName.toLowerCase();

    if (searchTerm === '' || (sprayName.includes(searchTerm) && spray.fullTransparentIcon !== null)) {
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
      if (data.favorites.includes(spray.displayName)) {
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
        const closestSprayName = cardContainer.lastChild.firstChild.textContent;
        data.favorites.push(closestSprayName);
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
