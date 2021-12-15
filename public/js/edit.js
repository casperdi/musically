'use strict';

const url = 'http://localhost:8000';
const takaisinButton = document.querySelector('#edit_takaisin');
const tallennaButton = document.querySelector('#edit_tallenna');
const modForm = document.getElementById('profile');
takaisinButton.addEventListener('click', async (evt) => {
  location.href = "profile"
});

const ul = document.getElementById("list");

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));
console.log(user)

const getUser = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/user/' + id, fetchOptions);
  console.log(response);
  const cat = await response.json();
  const inputs = modForm.querySelectorAll('input');
  const biotext = modForm.querySelector('textarea');
  inputs[0].value = /* url + '/uploads/'  +  cat.ppicture */'';
  inputs[1].value = cat.email;
  biotext.value = cat.bio;
};

tallennaButton.addEventListener('click', async (evt) => {
    let photo = document.getElementById("edit_kuva").files[0];
    let photoName = photo.name;  // file from input
    let formData = new FormData();
    console.log(photoName)

    formData.append("photo", photo);
    let imagePostresponse = await fetch(`${url}/upload/photo`, { method: "POST", body: formData });
    const imagePostJson = await imagePostresponse.json();
    const filePath = url + imagePostJson.fileUrl
    console.log("image Url " + filePath)

    const sPosti = document.getElementById("edit_sPosti").value
    const bio = document.getElementById("edit_bio").value

const data = {
    "ppicture": photoName,
    "email": sPosti,
    "bio": bio
    
  };

  for (const [prop, value] of Object.entries(data)) {
    if (value === '') {
      delete data[prop];
    }
  }
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/edit/' + user.userID, fetchOptions);
  const json = await response.json();
  if(response.status == 200){
    location.href = "profile"
  }else{
    alert(json.message)
  }
  console.log(response)
  console.log(
    json.message
  )
  
});

// create cat cards
const createPostCards = (posts) => {
    // clear ul
    ul.innerHTML = '';
    posts.forEach((post) => {
      console.log(post)
  
      const video = document.createElement('h3');
      video.innerHTML = post.video;
      video.classList.add('post-video')
      video.controls = true;

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Poista';
      deleteButton.classList.add('poistaButton')

      deleteButton.addEventListener('click', async (evt) => {
          deletePost(post.postID)
      })
  
      const li = document.createElement('li');
      li.classList.add('list-item')
  
      li.appendChild(video);
      video.appendChild(deleteButton);
      ul.appendChild(li);
  
    });
  
  };

  const getPosts = async () => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/upload/userPost/' + user.userID, fetchOptions);
      const posts = await response.json();
      console.log(posts)
      createPostCards(posts);
    } catch (e) {
      console.log(e.message);
    }
  };
  
  const deletePost = async (postID) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/upload/deletePost/' + postID, fetchOptions);
      const posts = await response.json();
      console.log(posts)
      console.log(response.status)
      getPosts();
    } catch (e) {
      console.log(e.message);
    }
  };

getUser(user.userID);
getPosts();
deletePost();

