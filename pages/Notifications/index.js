import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserById, getUserByUid, getUsersNotifications } from '../../API/Promises';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});
  const [notifs, setNotifs] = useState([]);

  const getCurrUserAndPartnerCode = () => {
    getUserByUid(user?.uid)?.then((data) => {
      setCurrUser(data);
      getUserById(data?.partnerId)?.then((partnerData) => {
        setPartnerUser(partnerData);
      });
    });
  };

  const getThisUsersNotifs = () => {
    getUsersNotifications(currUser?.id)?.then((notifData) => {
      setNotifs(notifData);
    });
  };

  useEffect(() => {
    getCurrUserAndPartnerCode();
    getThisUsersNotifs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.warn(partnerUser);
  return (
    <>
      <h1 className="text-center">Notifications</h1>
      <div className="notifs-div">
        {notifs?.map((notification) => <h5>{notification?.id}</h5>)}
      </div>
    </>
  );
}
