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
    <button onclick='loadCategoryVideos(${cat.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

    `

    // append element
    categoryContainer.append(categoryDiv)
    }

    
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



function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response=>response.json())
    .then(data=>displayVideos(data.videos))
}


const loadCategoryVideos=(id)=>{
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url).then(response=>response.json())
    .then(data => displayVideos(data.category))

}

const displayVideos = (videos) =>{
    // console.log(videos)
    videoContainer=document.getElementById('video-container');
    videoContainer.innerHTML='';
    videos.forEach(video=>{
        console.log(video)
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
                <p class="text-xs text-gray-500 flex gap-1">${video.authors[0].profile_name}<img class="w-4 h-4" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt=""></p>
                <p class="text-xs text-gray-500">${video.others.views}</p>
              </div>
            </div>
          </div>      
        `
        videoContainer.append(videoCard)
    })

}


loadCatagories()
// loadVideos()