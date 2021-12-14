'use strict';

const url = 'http://localhost:8000';
const peruutaButton = document.querySelector('#aD_peruuta');

peruutaButton.addEventListener('click', async (evt) => {
  location.href = "profile"
});
const lataa = document.querySelector('#aD_tallenna');

lataa.addEventListener('click', async (evt) => {
    let video = document.getElementById("aD_lataa").files[0];  // file from input
    let formData = new FormData();

    formData.append("video", video);
    let response = await fetch(`${url}/upload/video`, { method: "POST", body: formData });
    const json = await response.json();
    const filePath = url + json.fileUrl
    console.log("image Url " + url + json.fileUrl)


});