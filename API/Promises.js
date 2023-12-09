const dbUrl = 'https://localhost:7205';

const generatePartnerCode = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/generatePartnerCode/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text()) // Parse response as text
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const getAllusers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const handlePartnerCode = (partnerCode, enteringUserId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/handlePartnerCode/${partnerCode}/${enteringUserId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getUserWithMyMoodDTO = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userWithMyMood/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateUserById = (payload, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  generatePartnerCode,
  handlePartnerCode,
  getAllusers,
  getUserByUid,
  getUserById,
  getUserWithMyMoodDTO,
  updateUserById,
};
