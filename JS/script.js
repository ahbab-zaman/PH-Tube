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

// color remove buttons functions
const removeButtons = () => {
  const buttons = document.getElementsByClassName('category-btn');
  for(let btn of buttons){
    btn.classList.remove('active')
  }
}
// Category video functions
const getVideoCategory = (id) => {
   fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response => response.json()))
    .then((data) => {
      removeButtons();
      const activeBtn = document.getElementById(`btn-${id}`);
      showVideos(data.category);
      activeBtn.classList.add('active')
    })
}

// Show Button functions
const showNavButtons = (data) => {
  const navButtons = document.getElementById("nav-buttons");
  for (item of data) {
    const div = document.createElement("div");
  div.innerHTML = `<button id= "btn-${item.category_id}" onclick = "getVideoCategory(${item.category_id})" class = "btn category-btn">${item.category}</button>`
    navButtons.appendChild(div);
  }
};
getButtons();

// Videos Sections
const getVideos = async (searchText = "") => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  );
  const data = await response.json();
  showVideos(data.videos);
};

// Input text functions

document.getElementById('input-text').addEventListener('keyup', (e)=>{
  getVideos(e.target.value)
})
// Get Time functions
const getTime = (time) => {
  const hour  = parseInt(time/3600);
  let remainingSeconds =time % 3600 ;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hour} hour ${minute} minute ${remainingSeconds} seconds remaining`
}

// Get video id in modal button

const getVideoId = async(videoId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  const data = await response.json();
  displayDetails(data.video);
}
const displayDetails = (video) =>{
  // console.log(video)

  const modalBox = document.getElementById('modal-content');
  modalBox.innerHTML = `
  <img src= ${video.thumbnail} />
  <p>${video.description}</p.
  `

  document.getElementById('modal-btn').click();

} 
// Show Videos functions
const showVideos = (data) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";

  if (data.length == 0) {
    videoContainer.classList.remove('grid');
 videoContainer.innerHTML = `
    <div class = "min-h-[300px] mx-auto flex flex-col justify-center items-center space-y-2">
    <image src ="images/Icon.png"/>
    <h3 class = "text-2xl font-bold text-gray-500">No Content Here</h3>
    </div>
 `
  return;
  } else{
    videoContainer.classList.add('grid');
  }
  for (item of data) {
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
  <figure class= "h-[200px] relative">
    <img class ="h-full w-full object-cover"
      src="${item.thumbnail}"
      alt="" />
          ${item.others.posted_date.length == 0 ? "" : ` <span class="absolute right-2 bottom-2 bg-black text-white rounded-md p-2 text-sm">${getTime(item.others.posted_date)}</span>`}
  </figure>
        <div class="flex gap-3 px-0 py-4">
         <div>
          <img class="w-10 h-10 rounded-full" src="${
            item.authors[0].profile_picture
          }" alt="">
         </div>
         <div>
          <h3 class="text-lg font-bold">${item.title}</h3>
          <p class="flex gap-2">
            <p>${item.authors[0].profile_name}</p>
            <div>${
              item.authors[0].verified === true
                ? `<img src ="https://cdn-icons-png.flaticon.com/128/7641/7641727.png" class = "w-5"`
                : ""
            }</div>
          </p>
          <p>${item.others.views}</p>
          <button onclick="getVideoId('${item.video_id}')" class= "btn btn-error mt-2">Details</button>
         </div>
         </div>`;
    videoContainer.appendChild(card);
  }
};
getVideos();
