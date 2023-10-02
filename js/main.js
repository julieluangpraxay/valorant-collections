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

setInterval(carousel, 1000);

const $cardContainer = document.querySelector('.card-container');

function getSkinsData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/sprays');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    $cardContainer.innerHTML = '';

    for (let i = 0; i < xhr.response.data.length; i++) {

      if (xhr.response.data[i].fullTransparentIcon !== null) {
        data.sprays.push(xhr.response.data[i]);
        const $row = document.querySelector('.row');
        const $columnThird = document.createElement('div');
        const $cardWrapper = document.createElement('div');
        const $iconImage = document.createElement('img');
        const $textWrapper = document.createElement('div');
        const $sprayTitle = document.createElement('p');

        if (xhr.response.data[i].animationGif !== null) {
          $iconImage.src = xhr.response.data[i].animationGif;
        } else {
          $iconImage.src = xhr.response.data[i].fullTransparentIcon;
        }

        $cardWrapper.classList.add('card-wrapper');
        $iconImage.classList.add('spray-icon');
        $textWrapper.classList.add('text-wrapper');
        $sprayTitle.classList.add('spray-title');
        $columnThird.classList.add('column-third');

        $sprayTitle.textContent = xhr.response.data[i].displayName;

        $row.appendChild($columnThird);
        $cardWrapper.appendChild($columnThird);
        $cardContainer.appendChild($cardWrapper);
        $cardWrapper.appendChild($iconImage);
        $iconImage.appendChild($textWrapper);
        $cardWrapper.appendChild($textWrapper);
        $textWrapper.appendChild($sprayTitle);

      }
    }
  });
  xhr.send();
}

getSkinsData();

// $const $searchBar = document.querySelector('search');

// $searchBar.addEventListener('input', )
// function searchSprays() {

// }
