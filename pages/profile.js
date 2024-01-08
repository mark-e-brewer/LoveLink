import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'react-bootstrap';
import {
  getUserById, getUserByUid, getUsersNotifications, getUsersUnviewedNotifs, setNotifsViewed,
} from '../API/Promises';
import { useAuth } from '../utils/context/authContext';
import NotificationCard from '../components/NotificationCard';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});
  const [notifs, setNotifs] = useState([]);
  const [markedAsViewed, setMarkedAsViewed] = useState(false);

  const getTheCurrentUserAndPartner = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
      if (data?.partnerId != null) {
        getUserById(data?.partnerId)?.then((partnerData) => {
          setPartnerUser(partnerData);
        });
      }
    });
  };

  const getCurrUserAndNotifs = () => {
    getUserByUid(user?.uid)?.then((data) => {
      getUsersNotifications(data?.id)?.then((notifData) => {
        setNotifs(notifData);
        getUsersUnviewedNotifs(user?.id)?.then((unviewedData) => {
          if (unviewedData?.length > 0 && !markedAsViewed) {
            setMarkedAsViewed(true);
            setNotifsViewed(unviewedData);
          }
        });
      });
    });
  };

  useEffect(() => {
    getTheCurrentUserAndPartner();
    getCurrUserAndNotifs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatAnniversaryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="d-flex">
        <div>
          <div
            className="d-flex flex-column justify-content-between"
            style={{
              maxWidth: '300px',
              borderRadius: '30px',
            }}
          >
            <Button onClick={(() => router.push(`/ProfileUpdate/${currUser.id}`))}>Edit Profile</Button>
            <Image className="profile-photo-img" src={`/LoveLinkProfilePhotos/${currUser.profilePhoto}`} />
            <Button onClick={(() => router.push(`/ProfileUpdate/Photo/${currUser?.id}`))}>
              Update Photo
            </Button>
          </div>
          <div>
            <h3>Name: {user.name}</h3>
            <h3>Gender: {currUser.gender}</h3>
            <h3>Age: {currUser.age}</h3>
            <h3>Bio: {currUser.bio}</h3>
            <h3>Partner Name: {partnerUser.name}</h3>
            <h3>Anniversary Date: {formatAnniversaryDate(currUser.anniversaryDate)}</h3>
          </div>
        </div>
        <div>
          <h1 className="text-center">Notifications</h1>
          <div className="notifs-div d-flex justify-content-center flex-column">
            {notifs?.map((notification) => (
              <NotificationCard key={notification.id} notifObj={notification} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
