const queryMusic = $("#queryMusic");

var music = "";
async function downloadMusic(videoID){
  // console.log({videoID})
  // const baseURL = `https://www.youtube.com/watch?v=${videoID}`
  // const response = (await axios.get(`http://localhost:3333/downloader?url=${baseURL}`)).data;
  // music = response;
}

function createVideoBox(video){
  try{
  const title = video.title.runs[0].text
  const url = video.thumbnail.thumbnails[0].url
  const description = video.descriptionSnippet.runs[0].text
  const videoId = video.videoId;

  const boxvideoDiv = document.createElement('div');
  boxvideoDiv.className = "boxvideo";

  //START VIDEO SETTINGS
  const videoDiv = document.createElement('div');
  videoDiv.className = "video";

  const img = document.createElement('img');
  img.src = url; //need add image

  const descDiv = document.createElement('div');
  descDiv.className = "desc";
  
  const descSubDiv = document.createElement('div');

  const titleH2 = document.createElement('h2');
  titleH2.id = "title"
  titleH2.textContent = title //need add text

  const descriptionP = document.createElement('p')
  descriptionP.id = "description";
  descriptionP.textContent = description //need add text description

  descSubDiv.appendChild(titleH2)
  // descSubDiv.appendChild(viwersP)

  descDiv.appendChild(descSubDiv);
  descDiv.appendChild(descriptionP);

  videoDiv.appendChild(img)
  videoDiv.appendChild(descDiv);
  //END VIDEO SETTINGS --->

  //START OPTIONS SETTINGS

  const optionsDiv = document.createElement('div');
  optionsDiv.className = "options";

  const downloadButton = document.createElement('a');
  downloadButton.textContent = "BAIXAR";
  const baseURL = `https://www.youtube.com/watch?v=${videoId}`
  downloadButton.href = `http://localhost:3333/downloader?url=${baseURL}`;

  const plazarento = document.createElement("p");

  optionsDiv.appendChild(plazarento)
  optionsDiv.appendChild(downloadButton);

  //END OPTIONS SETTINGS --->

  //SETTING ALL BOX VIDEO
  boxvideoDiv.appendChild(videoDiv);
  boxvideoDiv.appendChild(optionsDiv);
  //ENDING BOX VIDEO

  $(".musics").append(boxvideoDiv);
  }catch(err){
    return console.log({ error: err.message })
  }
}

async function searchByQuery(){
  const value = queryMusic.val()
  if(!value) return;
  
  const response = (await axios.get(`http://localhost:3333/search?query=${value}`)).data
  if(response.length == 0)
    return;

  response.forEach(video => createVideoBox(video));
  return true
}

(async function(){
  document.getElementsByTagName("form")[0].addEventListener('submit', async (event) => {
    event.preventDefault();

    $(".musics")[0].textContent = "";

    queryMusic.prop("disabled", true)
    await searchByQuery();
    queryMusic.prop("disabled", false)
    queryMusic.val("")
  })
})()