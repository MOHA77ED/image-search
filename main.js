// Unsplash api
const accessKey = "YEOqtPyFkCest4LQSG2T3ppvM6Dza5tInD1QQrLKIno";
let saveSearch = "";
let page = 1;
let images = [];
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let showMoreButton = document.querySelector(".show-more");
let showResultContainer = document.querySelector(".results");
let deleteButton = document.getElementById("delete-button");

deleteButton.addEventListener("click" , function() {
  showResultContainer.innerHTML = "";
  window.localStorage.clear();
})

searchButton.addEventListener("click" , function() {
  search();
  page++;
  window.localStorage.setItem("page-number", page);
});
searchInput.addEventListener("keyup" , function(e) {
  if(e.key === "Enter") {
    search();
    page++;
    window.localStorage.setItem("page-number", page);
  } else {
    return;
  }
  
});

let imagesLocalStorage = window.localStorage.getItem("images");
if(imagesLocalStorage) {
  
  let imagesLocalStorageObject = JSON.parse(imagesLocalStorage);
  images = imagesLocalStorageObject;
  imagesLocalStorageObject.forEach(function (image) {
    let imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image");
    let img = document.createElement("img");
    img.src = image.imgSrc;
    img.alt = image.imgAlt;

    imgContainer.appendChild(img);

    let size = document.createElement("div");
    size.classList.add('size');
    let width = document.createElement("span");
    width.classList.add("width");
    width.textContent = `Width : ${image.imgWidth}`
    let height = document.createElement("span");
    height.classList.add("height");
    height.textContent = `Height : ${image.imgHeight}`;

    size.appendChild(width);
    size.appendChild(height);

    let download = document.createElement("a");
    download.classList.add("download");
    download.href = image.linkHref;
    download.textContent = `Download`;
    download.setAttribute("target" ,"_blank");

    imageBox.appendChild(imgContainer);
    imageBox.appendChild(size);
    imageBox.appendChild(download);

    showResultContainer.appendChild(imageBox);
  })
}

if(window.localStorage.getItem("page-number")) {
  page = window.localStorage.getItem("page-number");
}

async function search() {
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput.value}&client_id=${accessKey}`;


    let response = await fetch(url);
    let data = await response.json();
    let results = data.results;

    console.log(results);

    results.map(function(element) {
      let imageBox = document.createElement("div");
      imageBox.classList.add("image-box");

      let imgContainer = document.createElement("div");
      imgContainer.classList.add("image");
      let img = document.createElement("img");
      img.src = element.urls.small;
      img.alt = element.alt_description;

      imgContainer.appendChild(img);

      let size = document.createElement("div");
      size.classList.add('size');
      let width = document.createElement("span");
      width.classList.add("width");
      width.textContent = `Width : ${element.width}`
      let height = document.createElement("span");
      height.classList.add("height");
      height.textContent = `Height : ${element.height}`;

      size.appendChild(width);
      size.appendChild(height);

      let download = document.createElement("a");
      download.classList.add("download");
      download.href = element.links.html;
      download.textContent = `Download`;
      download.setAttribute("target" ,"_blank");

      imageBox.appendChild(imgContainer);
      imageBox.appendChild(size);
      imageBox.appendChild(download);

      showResultContainer.appendChild(imageBox);

      let imgObject = {
        imgSrc: element.urls.small,
        imgAlt: element.alt_description,
        imgWidth: element.width,
        imgHeight: element.height,
        linkHref: element.links.download
      }

      images.push(imgObject);
      window.localStorage.setItem("images" , JSON.stringify(images));
    });
    saveSearch = searchInput.value;
    window.localStorage.setItem("lastSearch" , searchInput.value);
    window.localStorage.setItem("page-number" , page);
    searchInput.value = '';
}

showMoreButton.addEventListener("click" , function() {
  page++;
  if(window.localStorage.getItem("lastSearch")) {
    searchInput.value = window.localStorage.getItem("lastSearch");
  } else {
    searchInput.value = saveSearch;
  }
  search();
});

const buttonUp = document.getElementById('up');

buttonUp.onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
window.onscroll = () =>{
  if(window.pageYOffset >= window.innerHeight * 2) {
    buttonUp.style.display = "block";

  } else {
    buttonUp.style.display = 'none';
  }
}
