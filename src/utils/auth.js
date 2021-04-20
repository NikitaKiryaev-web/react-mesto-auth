export const url = "https://api.kiryaev.students.nomoredomains.club";

export const reg = (password, email) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });  
};

export const auth = (password, email) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
};

export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
};