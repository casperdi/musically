'use strict';

const url = 'http://localhost:8000';
const takaisinButton = document.querySelector('#edit_takaisin');
const tallennaButton = document.querySelector('#edit_tallenna');

takaisinButton.addEventListener('click', async (evt) => {
  location.href = "profile"
});

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

tallennaButton.addEventListener('click', async (evt) => {
    let photo = document.getElementById("edit_kuva").files[0];  // file from input
    let formData = new FormData();

    formData.append("photo", photo);
    let imagePostresponse = await fetch(`${url}/upload/photo`, { method: "POST", body: formData });
    const imagePostJson = await imagePostresponse.json();
    const filePath = url + imagePostJson.fileUrl
    console.log("image Url " + filePath)

    const sPosti = document.getElementById("edit_sPosti").value
    const bio = document.getElementById("edit_bio").value

const data = {
    "ppicture": filePath,
    "email": sPosti,
    "bio": bio
    
  };
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  let response = await fetch(url + '/auth/edit', fetchOptions);
  let json = await response.json();
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

