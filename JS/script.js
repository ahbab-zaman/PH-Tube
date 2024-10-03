// Categories Buttons
const getButtons = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await response.json();
    showNavButtons(data.categories);
  } catch (error) {
    console.log("Error happened", error);
  }
};
const showNavButtons = (data) => {
  const navButtons = document.getElementById("nav-buttons");
  for (item of data) {
    const div = document.createElement("div");
    div.classList.add("btn");
    div.innerText = item.category;
    navButtons.appendChild(div);
  }
};
getButtons();

// Videos Sections
const getVideos = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await response.json();
  showVideos(data.videos);
};

const showVideos = (data) => {
  const videoContainer = document.getElementById("videos-container");
  for (item of data) {
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
  <figure class= "h-[200px]">
    <img class ="h-full w-full object-cover"
      src="${item.thumbnail}"
      alt="" />
  </figure>
  <div class="px-0 py-3 flex gap-3">
     <div><img class="w-10 h-10 rounded-full" src="${item.authors[0].profile_picture}" alt=""></div>
            <div>
                <h3 class= "font-bold text-lg">${item.title}</h3>
               <div class="flex items-center gap-2">
                <p>${item.authors[0].profile_name}</p>
                
               ${item.authors[0].verified === true ? `<img src ="https://cdn-icons-png.flaticon.com/128/7641/7641727.png" class = "w-5"` : ""}
               </div>
               </div>
               <p class= "block">${item.others.views}</p>
               </div>`
    videoContainer.appendChild(card);
  }
};
getVideos();
