const $bannerCarousel = document.querySelectorAll('.banner');

let currentBannerIndex = 0;
let countDownId = null;

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

countDownId = setInterval(carousel, 3000);
clearInterval(countDownId);
