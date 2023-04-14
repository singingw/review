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