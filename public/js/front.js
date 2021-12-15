'use strict';

const url = 'http://10.114.34.92/server'; // change url when uploading to server

// select existing html elements
const ul = document.getElementById("list");

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// create cat cards
const createPostCards = (posts) => {
  // clear ul
  ul.innerHTML = '';
  posts.forEach((post) => {
      console.log(post)
    // create li with DOM methods
    

    const img = document.createElement('img');
    img.src = url + '/uploads/'  +  post.ppicture;
    img.alt = post.ppicture;
    img.classList.add('profilepic');

    const p1 = document.createElement('p');
    p1.innerHTML = post.username;
    p1.classList.add('username');
    
    const video = document.createElement('video');
    video.src = url + '/uploads/'  +  post.video;
    video.classList.add('post-video')
    video.controls = true;

    const p2 = document.createElement('p');
    p2.innerHTML = post.caption;

    const li = document.createElement('li');
    li.classList.add('list-item')

    const div = document.createElement('div');
    div.classList.add('post-profile');

    div.appendChild(img);
    div.appendChild(p1);
    li.appendChild(div);
    li.appendChild(video);
    li.appendChild(p2);

    ul.appendChild(li);

  });
  
};

function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    console.log(videos)
    videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                                video.muted = true;
                            } else if (video.paused) {
                                video.play();
                                video.muted = false;
                            }
                        });
                    },
                    { threshold: 0.2 }
                );
                observer.observe(video);
            });
        }
    });
}

// And you would kick this off where appropriate with:



// AJAX call
const getPost = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/upload/post', fetchOptions);
    const posts = await response.json();
    createPostCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost();
playPauseVideo();
