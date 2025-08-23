document.addEventListener("DOMContentLoaded", function () {
  const text ="I’m an aspiring Electronics & Communication Engineer,<br>passionate about  MERN Stack Development,Machine Learning,<br>and building innovative solutions.";
  const typingElement = document.querySelector(".typing");
  let index = 0;

  function type() {
    if (index < text.length) {
      // ✅ Handle <br> properly
      if (text.substring(index, index + 4) === "<br>") {
        typingElement.innerHTML += "<br>";
        index += 4;
      } else {
        typingElement.innerHTML += text.charAt(index);
        index++;
      }
      setTimeout(type, 50);
    }
  }

  typingElement.innerHTML = ""; // clear old text
  type();
});


  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });




 

