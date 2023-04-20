    function showPopup(Id) {
      document.getElementById(Id).style.display = "block"
    }

    function hidePopup(Id) {
      document.getElementById(Id).style.display = "none"
    }

    function readURL(input) {
      if (input.files) {
        const imageTagID = input.getAttribute("targetID")
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = document.getElementById(imageTagID)
          img.setAttribute("src", e.target.result)
        }
        reader.readAsDataURL(input.files[0])
      }
    }

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