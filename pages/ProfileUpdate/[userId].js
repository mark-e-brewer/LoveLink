import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserProfileForm from '../../components/Forms/UserProfileForm';
import { getUserByUid } from '../../API/Promises';
import { useAuth } from '../../utils/context/authContext';

export default function UpdateProfilePage() {
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const router = useRouter();
  const { userId } = router.query;

  const getTheCurrentUser = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
    });
  };

  useEffect(() => {
    getTheCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <UserProfileForm userObj={currUser} userID={userId} />
      </div>
    </>
  );
}
