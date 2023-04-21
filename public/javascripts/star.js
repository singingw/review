const starRating = document.getElementById('star-rating')
const rating = parseInt(starRating.getAttribute('data-rating'))
const stars = starRating.querySelectorAll('i')

stars.forEach((star, index) => {
  if (index < rating) {
    star.classList.add('fas')
    star.classList.remove('far')
  } else {
    star.classList.add('far')
    star.classList.remove('fas')
  }
})