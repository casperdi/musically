(async () => {
  'use strict';
  const url = 'http://10.114.34.92/server'; // change url when uploading to server

  // check sessionStorage
  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    location.href = 'login';
    return;
  }
  // check if token valid
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/token', fetchOptions);
    if (!response.ok) {
      location.href = 'logout';
    } else {
      const json = await response.json();
      sessionStorage.setItem('user', JSON.stringify(json.user));
    }
  } catch (e) {
    console.log(e.message);
  }
})();
