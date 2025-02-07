const imgIphone = document.querySelector(".iphone-img");
const shape = document.querySelector(".shape");

document.addEventListener("click", (e) => {
  const element = e.target;

  if (element.id === "green") {
    imgIphone.src = "img/green.png";
    shape.style.backgroundColor = "#384937";
  }
  if (element.id === "blue") {
    imgIphone.src = "img/blue.png";
    shape.style.backgroundColor = "#225f7e";
  }
  if (element.id === "black") {
    imgIphone.src = "img/black.png";
    shape.style.backgroundColor = "#192028";
  }
  if (element.id === "white") {
    imgIphone.src = "img/white.png";
    shape.style.backgroundColor = "#f7f2ee";
  }
  if (element.id === "red") {
    imgIphone.src = "img/red.png";
    shape.style.backgroundColor = "#ae0617";
  }
  if (element.id === "pink") {
    imgIphone.src = "img/pink.png";
    shape.style.backgroundColor = "#f8ddd6";
  }
});
