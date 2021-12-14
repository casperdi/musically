'use strict';
const url = 'http://localhost:8000'; // change url when uploading to server
const muokkaaButton = document.querySelector('#button');

muokkaaButton.addEventListener('click', async (evt) => {
  location.href = "edit"
});

// select existing html elements
const section = document.querySelector('#profile-info');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

const profileInfo = () => {



    const profileName = document.querySelector('#profile-name')
    profileName.innerHTML = user.username

    const profileImage = document.querySelector('#profilepic')
    profileImage.src = url + '/uploads/'  +  user.ppicture;

    const info = document.querySelector('#info_text')
    info.innerHTML = user.bio;


}

const getUser = async () => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/user', fetchOptions);
      const vittu = await response.json();
      profileInfo(vittu);
    } catch (e) {
      console.log(e.message);
    }
  };
  getUser();