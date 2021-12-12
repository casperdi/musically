'use strict';
const url = 'http://localhost:8000'; // change url when uploading to server

// select existing html elements
const section = document.querySelector('#profile-info');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));


const profileInfo = () => {

    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + user.ppicture;
    img.alt = user.username;
    img.classList.add('profilepic');

    

    const p2 = document.createElement('p');
    p2.innerHTML = user.bio;


    const p1 = document.createElement('p');
    p1.innerHTML = user.username;
    p1.setAttribute('id','profile-name');

    const a = document.createElement('a');
    a.href = "edit";
    a.classList.add('fa-cog'); 
    a.classList.add('fas'); 

  
    const wrap =  document.createElement('div');
    wrap.setAttribute('id','info-wrap');

    wrap.appendChild(p1);
    wrap.appendChild(p2);

    wrap.appendChild(a);
    
    /* wrap.appendChild(p2); */
    section.appendChild(img);
    section.appendChild(wrap);
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