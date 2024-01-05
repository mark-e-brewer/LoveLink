import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getUserById, getUserByUid, getUserWithMyMoodDTO } from '../../API/Promises';
import { useAuth } from '../../utils/context/authContext';

export default function PartnerProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});
  const [partnerMyMoodDto, setPartnerMyMoodDto] = useState({});
  const { PartnerId } = router.query;

  const getTheCurrentUserAndPartner = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
      getUserById(PartnerId)?.then((partnerData) => {
        setPartnerUser(partnerData);
      });
    });
  };

  const getPartnerUserMood = () => {
    if (user.id != null) {
      getUserWithMyMoodDTO(PartnerId)?.then((data) => {
        setPartnerMyMoodDto(data);
      });
    }
  };
  useEffect(() => {
    getTheCurrentUserAndPartner();
    getPartnerUserMood();
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
            <Image className="profile-photo-img" src={`/LoveLinkProfilePhotos/${partnerUser.profilePhoto}`} />
          </div>
          <div>
            <h3>Name: {partnerUser.name}</h3>
            <h3>Gender: {partnerUser.gender}</h3>
            <h3>Age: {partnerUser.age}</h3>
            <h3>Bio: {partnerUser.bio}</h3>
            <h3>Partner Name: {currUser.name}</h3>
            <h3>Anniversary Date: {formatAnniversaryDate(partnerUser.anniversaryDate)}</h3>
          </div>
        </div>
        <div>
          <h1>Partners Mood: {partnerMyMoodDto?.myMood?.moodName}</h1>
        </div>
      </div>
    </>
  );
}
