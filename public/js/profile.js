'use strict';
const url = 'http://localhost:8000'; // change url when uploading to server
const muokkaaButton = document.querySelector('#button1');
const logoutButton = document.querySelector('#button2')

muokkaaButton.addEventListener('click', async (evt) => {
  location.href = "edit"
});

logoutButton.addEventListener('click', async (evt) => {
  location.href = "logout"
});

// select existing html elements
const section = document.querySelector('#profile-info');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

const profileInfo = (kayttaja) => {



    const profileName = document.querySelector('#profile-name')
    profileName.innerHTML = kayttaja.username

    const profileImage = document.querySelector('#profilepic')
    profileImage.src = url + '/uploads/'  +  kayttaja.ppicture;

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
      const response = await fetch(url + '/user/' + user.userID , fetchOptions);
      const vittu = await response.json();
      profileInfo(vittu);
    } catch (e) {
      console.log(e.message);
    }
  };
  getUser();