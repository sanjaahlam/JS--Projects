const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");



async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Please enter a number between 1 and 10";
    return;
  }

  try {
    //  add loading effect
    btnEl.style.display = 'none';
    let loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;

    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=
      ${Math.round(Math.random() * 1000)}
      &client_id=B8S3zB8gCPVCvzpAhCRdfXg_aki8PZM_q5pAyzDUvlc`
    ).then((res) =>
      res.json().then((data) => {
        // get url images
        galleryEl.innerHTML = "";
        data.map((image) => {
          const imageEl = document.createElement("img");
          imageEl.src = image.urls.small;
          galleryEl.style.display = "block";
          galleryEl.appendChild(imageEl);
          btnEl.style.display = "block";
          errorMessageEl.style.display = "none";
        })
        
      })

    );
    
  } catch (error) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "An error happened,try again later";
    btnEl.style.display = "block";
    galleryEl.style.display = "none";
  }
}


btnEl.addEventListener("click", fetchImage);


