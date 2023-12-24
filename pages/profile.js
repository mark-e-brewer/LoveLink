import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'react-bootstrap';
import { getUserById, getUserByUid } from '../API/Promises';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});

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

  useEffect(() => {
    getTheCurrentUserAndPartner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatAnniversaryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
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
    </>
  );
}
