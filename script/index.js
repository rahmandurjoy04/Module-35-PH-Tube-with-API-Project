function removeActiveClass(){
    const activeButtons=document.getElementsByClassName('active');
    console.log(activeButtons)
    for (let btn of activeButtons){
        btn.classList.remove('active')
    }
}

function loadCatagories(){
    // Fetching the Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // converting promise to json
    .then((response)=>response.json())
    // send data to display
    .then((data=>displayCategories(data.categories)))
}

function displayCategories(categories){
    // get the container
    categoryContainer = document.getElementById('catagory-container')
    // loop operation on array of object
    for(let cat of categories){
        // console.log(cat)
    // create element
    const categoryDiv=document.createElement('div');
    categoryDiv.innerHTML=`
    <button id="btn-${cat.category_id}" onclick='loadCategoryVideos(${cat.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

    `

    // append element
    categoryContainer.append(categoryDiv)
    }

    
}


const showLoader = ()=>{
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('video-container').classList.add('hidden');
}
const hideLoader = ()=>{
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('video-container').classList.remove('hidden');
}


/**
 * {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
 */



function loadVideos(searchtext=''){
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    .then(response=>response.json())
    .then(data=>{
        removeActiveClass();

    document.getElementById('button-all').classList.add('active')

        displayVideos(data.videos)
    })
}


const loadCategoryVideos=(id)=>{
    showLoader()
    // console.log(id)
    removeActiveClass();


    const clickedButton = document.getElementById(`btn-${id}`)
    clickedButton.classList.add('active')
        // console.log(clickedButton)
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url).then(response=>response.json())
    .then(data => displayVideos(data.category))

}

const loadVideoDetails=(videoID)=>{
    // console.log(videoID);
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    fetch(url).then(response =>response.json())
    .then(data=>displayVideoDetails(data.video))
}

const displayVideoDetails = (video)=>{
console.log(video)
document.getElementById('video_details').showModal()
const detailsContainer = document.getElementById('details-container');
detailsContainer.innerHTML=`
<div class="card bg-base-100 image-full mx-auto shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>`
}



const displayVideos = (videos) =>{
    // console.log(videos)
    videoContainer=document.getElementById('video-container');
    videoContainer.innerHTML='';

    if(videos.length==0){
        videoContainer.innerHTML=`
        <div class="col-span-full text-center flex flex-col justify-center items-center py-20 ">
            <img class="w-[160px]" src="assets/Icon.png" alt="">
            <h2 class="text-3xl font-bold pt-6">Oops!! Sorry, There is no content here</h2>
         </div>
        `;
        hideLoader()
        return;
    }
    videos.forEach(video=>{
        // console.log(video)
        const videoCard= document.createElement('div');
        videoCard.innerHTML=`
        <div class="card bg-base-100 ">
            <figure class="relative">
              <img class='w-full h-[200px] object-cover'
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white bg-black border-none rounded-sm text-sm p-1">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-2 px-0 py-4">
              <div class="profile">
                <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-bold">Midnight Serenade</h2>
                <p class="text-xs text-gray-500 flex gap-1">${video.authors[0].profile_name}
                 ${video.authors[0].verified == true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">` :''}
                </p>
                <p class="text-xs text-gray-500">${video.others.views}</p>
              </div>
            </div>
            <button onclick ="loadVideoDetails('${video.video_id}')" class="btn btn-block" >Show Details</button>
          </div>      
        `
        videoContainer.append(videoCard);
        hideLoader()
    })

}


document.getElementById('search-input').addEventListener('keyup',(e)=>{
    const input = e.target.value;
    loadVideos(input)
})

loadCatagories()
// loadVideos()