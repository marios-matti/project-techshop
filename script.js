const btnRegi = document.querySelector(".btn-regi");
const btnSign = document.querySelector(".btn-sign");
const register = document.querySelector(".register");
const signIn = document.querySelector(".sign-in");
const closeRegi = document.querySelectorAll(".close-regi");

btnRegi.addEventListener("click", function () {
  register.classList.add("open");
  signIn.classList.remove("open");
});
btnSign.addEventListener("click", function () {
  signIn.classList.add("open");
  register.classList.remove("open");
});

closeRegi.forEach((btn) => {
  btn.addEventListener("click", function () {
    register.classList.remove("open");
    signIn.classList.remove("open");
  });
});

const cartShop = document.querySelector(".cart-shop");
const cartBtn = document.querySelector(".cart-btn");
const closeCart = document.querySelector(".close-cart");

cartBtn.addEventListener("click", function () {
  cartShop.classList.add("open-cart");
});
closeCart.addEventListener("click", function () {
  cartShop.classList.remove("open-cart");
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // let removeItemBtn = document.getElementsByClassName("cart-item-remove");
  const removeItemBtn = document.querySelectorAll(".cart-item-remove");

  removeItemBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.target.parentElement.remove();
      // event.target.parentNode.remove();
      // event.currentTarget.parentElement.remove();
      updateCartTotal();
    });
  });

  let quantityInputs = document.querySelectorAll(".cart-item-quantity");
  quantityInputs.forEach((inputNum) => {
    inputNum.addEventListener("change", quantityChange);
  });

  let addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", addToCartClicked);
  });
}

// for (let i = 0; i < removeItemBtn.length; i++) {
//   let button = removeItemBtn[i];
//   button.addEventListener("click", function (event) {
//     let btnClicked = event.target;
//     // let btnClicked = event.currentTarget;
//     // btnClicked.innerHTML = "hi";
//     // btnClicked.parentElement.remove();
//     btnClicked.parentNode.remove();
//   });
// }

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("items-cart")[0];
  let itemCart = cartItemContainer.getElementsByClassName("cart-item");
  let total = 0;
  for (let i = 0; i < itemCart.length; i++) {
    let item = itemCart[i];
    let priceElement = item.getElementsByClassName("cart-item-price")[0];
    let quantityElement = item.getElementsByClassName("cart-item-quantity")[0];
    console.log(priceElement, quantityElement);
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    console.log(price);
    let quantity = quantityElement.value;
    // console.log(price * quantity);
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let itemCard = button.parentElement.parentElement;
  let cardImg = itemCard.getElementsByClassName("card-img")[0].src;
  let cardTitle = itemCard.getElementsByClassName("title-card")[0].innerText;
  let cardPrice = itemCard.getElementsByClassName("card-price")[0].innerText;

  console.log(cardImg, cardTitle, cardPrice);
  addItemToCart(cardImg, cardTitle, cardPrice);
  updateCartTotal();
}

function addItemToCart(cardImg, cardTitle, cardPrice) {
  let cartItem = document.createElement("div");
  // cartItem.innerText = cardTitle;
  cartItem.classList.add("cart-item");
  let itemscart = document.getElementsByClassName("items-cart")[0];
  let cartItemNames = itemscart.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == cardTitle) {
      alert("this item already added to the cart");
      return;
    }
  }
  let cartItemContents = `<div class="cart-item">
  <img src="${cardImg}" class="cart-item-img" alt="" srcset="">
  <span class="cart-item-title"> ${cardTitle}</span>
  <span class="cart-item-price">${cardPrice}</span>
  <input type="number" class="cart-item-quantity" title="quantity" name="num" value="1" id="">
  <button class="cart-item-remove" title="remove">&#215;</button>
</div>`;
  cartItem.innerHTML = cartItemContents;
  itemscart.append(cartItem);
  cartItem
    .getElementsByClassName("cart-item-remove")[0]
    .addEventListener("click", function (event) {
      event.target.parentElement.remove();

      updateCartTotal();
    });
  cartItem
    .getElementsByClassName("cart-item-quantity")[0]
    .addEventListener("click", quantityChange);
  updateCartTotal();
}

const contentImg = [
  {
    link: "https://www.google.com",
    image: "images/slide1.jpg",
    imgTitle: "tech marios 1",
    info:
      "1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,laborum.",
  },
  {
    link: "https://www.google.com",
    image: "images/slide2.png",
    imgTitle: "tech marios 2",
    info:
      "2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,laborum.",
  },
  {
    link: "https://www.google.com",
    image: "images/slide3.jpg",
    imgTitle: "tech marios 3",
    info:
      "3 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,laborum.",
  },
  {
    link: "https://www.google.com",
    image: "images/slide4.png",
    imgTitle: "tech marios 4",
    info:
      "4 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,laborum.",
  },
];
const link = document.querySelector(".link");
const img = document.querySelector(".image");
const titleImg = document.querySelector(".img-title");
const imgInfo = document.querySelector(".info");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentItem = 0;
let timer;
const sliderBox = document.querySelector(".slideshow");

window.addEventListener("DOMContentLoaded", function () {
  changeImg();
  showImages();
});

function showImages() {
  const item = contentImg[currentItem];
  link.href = item.link;
  img.src = item.image;
  titleImg.textContent = item.imgTitle;
  imgInfo.textContent = item.info;
}
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > contentImg.length - 1) {
    currentItem = 0;
  }
  showImages();
});
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = contentImg.length - 1;
  }
  showImages();
});

function changeImg() {
  timer = setInterval(() => {
    currentItem++;
    if (currentItem > contentImg.length - 1) {
      currentItem = 0;
    }
    showImages();
  }, 5000);
}

sliderBox.addEventListener("mouseenter", () => {
  clearInterval(timer);
});
sliderBox.addEventListener("mouseleave", changeImg);
