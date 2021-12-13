'use strict';

const url = 'http://localhost:8000';
const takaisinButton = document.querySelector('#edit_takaisin');
const tallennaButton = document.querySelector('#edit_tallenna');

takaisinButton.addEventListener('click', async (evt) => {
  location.href = "profile"
});

tallennaButton.addEventListener('click', async (evt) => {
    let photo = document.getElementById("edit_kuva").files[0];  // file from input
    let formData = new FormData();

    formData.append("photo", photo);
    let response = await fetch(`${url}/upload/photo`, { method: "POST", body: formData });
    const json = await response.json();
    const filePath = url + json.fileUrl
    console.log("image Url " + url + json.fileUrl)

    const sPosti = document.getElementById("edit_sPosti").value
    const bio = document.getElementById("edit_bio").value

const data = {
    "ppicture": filePath,
    "email": sPosti,
    "bio": bio
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/edit', fetchOptions);
  const json = await response.json();
  if(response.status == 200){
    location.href = "main"
  }else{
    alert(json.message)
  }
  console.log(response)
  console.log(
    json.message
  )
  
});
