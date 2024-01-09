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
    .then((data) => {
      console.warn('Response from server:', data);
      resolve(data);
    })
    .catch(reject);
});

const updateProfilePhotoById = (profilePhoto, userId) => new Promise((resolve, reject) => {
  const formData = new FormData();
  formData.append('profilePhoto', profilePhoto);

  fetch(`${dbUrl}/user/${userId}/profile-photo`, {
    method: 'PUT',
    body: formData,
  })
    // .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateUserById = (payload, userId) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  fetch(`${dbUrl}/user/${userId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUsersJournalsById = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/alluserjournals/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values((data))))
    .catch(reject);
});

const getJournalByIdNoTags = (journalId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journal/${journalId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getJournalByIdWithTags = (journalId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journalwithmoodtags/${journalId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values((data))))
    .catch(reject);
});

const createJournal = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/newjournal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Payload Example for 'createJournal' & 'updateJournalById'
// {
//   "UserId": 1,
//   "PartnerId": 2,
//   "PartnerUid": "efg789hij0",
//   "Name": "Test for Notification Trigger1",
//   "Entry": "I hope this works!",
//   "DateEntered": "2023-11-18T09:30:42.653133",
//   "Visibility": "Public"
// }

const updateJournalById = (payload, journalId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/journal/${journalId}`, {
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

const deleteJournalById = (journalId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/deletejournal/${journalId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addMoodTagsToJournalById = (journalId, moodTagsArray) => new Promise((resolve, reject) => {
  const payload = {
    tagIds: moodTagsArray,
  };

  fetch(`${dbUrl}/attachmanymoodtags/${journalId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMoodTagsInJournalById = (journalId, moodTagsArray) => new Promise((resolve, reject) => {
  const payload = {
    tagIds: moodTagsArray,
  };

  fetch(`${dbUrl}/editmoodtags/${journalId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllMoodTags = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/allMoodTags`, {
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

const getUsersNotifications = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userNotifs/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values((data))))
    .catch(reject);
});

const deleteNotificationById = (notificationId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/deleteNotif/${notificationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const postMyMoodToUser = (userId, myMoodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user/${userId}/mymood/${myMoodId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        reject(new Error(`Server returned status: ${response.status}`));
        return;
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // eslint-disable-next-line consistent-return
        return response.json();
      }
      // eslint-disable-next-line consistent-return
      return {};
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllMyMoods = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/myMoods?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMostRecentUserJournal = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recentJournal/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const setNotifsViewed = (notifsArray) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  fetch(`${dbUrl}/setNotifsViewed`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ Notifications: notifsArray }),
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

const getUsersUnviewedNotifs = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/unviewedNotifs/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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
  getUsersJournalsById,
  getJournalByIdNoTags,
  getJournalByIdWithTags,
  createJournal,
  updateJournalById,
  deleteJournalById,
  addMoodTagsToJournalById,
  updateMoodTagsInJournalById,
  getAllMoodTags,
  getUsersNotifications,
  deleteNotificationById,
  updateProfilePhotoById,
  postMyMoodToUser,
  getAllMyMoods,
  getMostRecentUserJournal,
  setNotifsViewed,
  getUsersUnviewedNotifs,
};
