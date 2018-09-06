  var contacts__button = document.querySelector(".contacts__button");
  var contacts__map = document.querySelector(".contacts__map");
  
  var modal__message = document.querySelector(".modal__message");
  var message__close = modal__message.querySelector(".modal__close");

  var modal__map = document.querySelector(".modal__map");
  var map__close = modal__map.querySelector(".modal__close");

  var modal__overlay = document.querySelector(".modal__overlay");

  var form = modal__message.querySelector("form");

  var control__name = modal__message.querySelector("[name=control__name]");
  var control__email = modal__message.querySelector("[name=control__email]");

  var isStorageSupport = true;
  var name = "";
  var email = "";

  try {
    name = localStorage.getItem("name");
    email = localStorage.getItem("email");
  } catch (err) {
    isStorageSupport = false;
  }

  function modalClose(){
    if (modal__message.classList.contains("modal__show"))
      modal__message.classList.remove("modal__show");
    if (modal__map.classList.contains("modal__show")) 
      modal__map.classList.remove("modal__show");
    modal__overlay.classList.remove("modal__show-overlay");
  };

  contacts__button.addEventListener("click", function (evt) {
    modal__overlay.classList.add("modal__show-overlay");
    modal__message.classList.add("modal__show");
    if (name !== "null")
      control__name.value = name;
    if (email !== "null")
      control__email.value = email;
    control__name.focus();
  });

  contacts__map.addEventListener("click", function (evt) {
    modal__overlay.classList.add("modal__show-overlay");
    modal__map.classList.add("modal__show");
  });

  message__close.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalClose();
  });

  map__close.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalClose();
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      modalClose();
    }
  });

  form.addEventListener("submit", function (evt) {
    if (isStorageSupport) {
        localStorage.setItem("name", control__name.value);
        localStorage.setItem("email", control__email.value);        
    }
  });

/*map*/
  ymaps.ready(init);
  function init () {
    var myMap = new ymaps.Map("map__container", {
      center: [55.686980, 37.529654],
      zoom: 17
    });

    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      balloonContentBody: [
                           "<address>Улица Стороителей, 15</address>"
                          ].join('')
      }, {preset: "islands#redIcon",});
      myMap.geoObjects.add(myPlacemark);
  };


