'use strict';

const url = 'http://localhost:8000';
const peruutaButton = document.querySelector('#aD_peruuta');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

peruutaButton.addEventListener('click', async (evt) => {
  location.href = "profile"
});
const lataa = document.querySelector('#aD_tallenna');

lataa.addEventListener('click', async (evt) => {
    let video = document.getElementById("aD_lataa").files[0];  // file from input
    let formData = new FormData();

    formData.append("video", video);
    let videoName = video.name;  // file from input
    let response = await fetch(`${url}/upload/video`, { method: "POST", body: formData });
    let json = await response.json();
    const filePath = url + json.fileUrl
    console.log("video Url " + url + json.fileUrl)

    const data = {
        "video": videoName,
        "caption": "placeholder caption",
      };


for (const [prop, value] of Object.entries(data)){
    if (value === '') {
      delete data[prop];
    }
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  let videopost = await fetch(url + '/upload/addData/' + user.userID, fetchOptions);
  const jjson = await videopost.json();
  if(videopost.status == 200){
    location.href = "profile"
  }else{
    alert(jjson.message)
  }
  console.log(videopost)
  console.log(
    jjson.message
);

});