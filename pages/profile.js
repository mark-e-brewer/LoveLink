import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getUserById, getUserByUid, getUsersNotifications, getUsersUnviewedNotifs, setNotifsViewed,
} from '../API/Promises';
import { useAuth } from '../utils/context/authContext';
import NotificationCard from '../components/NotificationCard';
import ProfileCard from '../components/ProfileCard';

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
        const sortedNotifs = notifData?.sort((a, b) => new Date(b.dateSet) - new Date(a.dateSet));
        setNotifs(sortedNotifs);
        getUsersUnviewedNotifs(user?.id)?.then((unviewedData) => {
          if (unviewedData?.length > 0 && !markedAsViewed) {
            setMarkedAsViewed(true);
            setNotifsViewed(unviewedData);
          }
        });
      });
    });
  };

  const getNotifsOnUpdate = () => {
    getUsersNotifications(user?.id)?.then((notifData) => {
      const sortedNotifs = notifData?.sort((a, b) => new Date(b.dateSet) - new Date(a.dateSet));
      setNotifs(sortedNotifs);
    });
  };

  useEffect(() => {
    getTheCurrentUserAndPartner();
    getCurrUserAndNotifs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center flex-column">
          <div className="d-flex justify-content-center flex-column align-self-center">
            <h1 className="text-center profile-header">Your Profile</h1>
            <div className="d-flex justify-content-center">
              <button type="button" className="edit-profile-btn" onClick={(() => router.push(`/ProfileUpdate/${currUser.id}`))}>Edit Profile</button>
            </div>
          </div>
          <div>
            <ProfileCard userObj={currUser} partnerUserObj={partnerUser} Name={user?.name} />
          </div>
        </div>
        <div>
          <h1 className="text-center notifications-header">Notifications</h1>
          <div className="notifs-div d-flex justify-content-center flex-column">
            {notifs?.map((notification) => (
              <NotificationCard key={notification.id} notifObj={notification} onUpdate={getNotifsOnUpdate} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
