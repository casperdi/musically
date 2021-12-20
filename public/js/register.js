'use strict';

const url = 'http://10.114.34.92/server';
const addUserForm = document.querySelector('#add-user-form');
const rekisteroidyButton = document.querySelector('#reg_rekisteroidy');
const peruutaButton = document.querySelector('#reg_peruuta');

peruutaButton.addEventListener('click', async (evt) => {
  location.href = "login"
});

rekisteroidyButton.addEventListener('click', async (evt) => {
  const kayttaja = document.getElementById("reg_kayttaja").value
  const sPosti = document.getElementById("reg_sPosti").value
  const salasana = document.getElementById("reg_salasana").value
  const salasanaU = document.getElementById("reg_salasanaU").value
  if (salasana != salasanaU) {
alert("salasanat eivät täsmää") 
return;
  }

  const data = {
    "username": kayttaja,
    "email": sPosti,
    "password": salasana,
    "ppicture": ""
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  if(response.status == 200){
    location.href = "login"
  }else{
    alert(json.message)
  }
  console.log(response)
  console.log(
    json.message
  )
  
});