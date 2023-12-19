import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getUserByUid } from '../../../API/Promises';
import ProfilePhotoUpdateForm from '../../../components/Forms/ProfilePhotoUpdate';

export default function UpdateProfilePhotoPage() {
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
      <ProfilePhotoUpdateForm userObj={currUser} userID={userId} />
    </>
  );
}
