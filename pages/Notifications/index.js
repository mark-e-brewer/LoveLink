import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import {
  getUserById, getUserByUid, getUsersNotifications,
} from '../../API/Promises';
import NotificationCard from '../../components/NotificationCard';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});
  const [notifs, setNotifs] = useState([]);

  const getCurrUserPartnerUserAndNotifs = () => {
    getUserByUid(user?.uid)?.then((data) => {
      setCurrUser(data);
      getUserById(data?.partnerId)?.then((partnerData) => {
        setPartnerUser(partnerData);
        getUsersNotifications(data?.id)?.then((notifData) => {
          setNotifs(notifData);
        });
      });
    });
  };

  useEffect(() => {
    getCurrUserPartnerUserAndNotifs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.warn(currUser, partnerUser);
  return (
    <>
      <h1 className="text-center">Notifications</h1>
      <div className="notifs-div d-flex justify-content-center flex-column">
        {notifs?.map((notification) => <NotificationCard notifObj={notification} />)}
      </div>
    </>
  );
}
