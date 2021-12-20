'use strict';
const url = 'http://10.114.34.92/server'; // change url when uploading to server
const muokkaaButton = document.querySelector('#button1');
const logoutButton = document.querySelector('#button2')

muokkaaButton.addEventListener('click', async (evt) => {
  location.href = "edit"
});

logoutButton.addEventListener('click', async (evt) => {
  location.href = "logout"
});

// select existing html elements
const ul = document.getElementById("list");

// select existing html elements
const section = document.querySelector('#profile-info');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

const profileInfo = (kayttaja) => {

  const profileName = document.querySelector('#profile-name')
  profileName.innerHTML = kayttaja.username

  const profileImage = document.querySelector('#profilepic')
  profileImage.src = url + '/uploads/' + kayttaja.ppicture;

  const info = document.querySelector('#info_text')
  info.innerHTML = kayttaja.bio;


}


const getUser = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/' + user.userID, fetchOptions);
    const vittu = await response.json();
    profileInfo(vittu);
    getPosts();
  } catch (e) {
    console.log(e.message);
  }
};

// create cat cards
const createPostCards = (posts) => {
  // clear ul
  ul.innerHTML = '';
  posts.forEach((post) => {
    console.log(post)

    const video = document.createElement('video');
    video.src = url + '/uploads/' + post.video;
    video.classList.add('post-video')
    video.controls = true;

    const li = document.createElement('li');
    li.classList.add('list-item')

    li.appendChild(video);
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


getUser();