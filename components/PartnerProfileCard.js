import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function PartnerProfileCard({ userObj, partnerName, Name }) {
  const formatAnniversaryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="profile-card">
        <div className="pc-photo-div">
          <div className="profile-photo-container-partner">
            <Image className="profile-photo-img-partner" src={`/LoveLinkProfilePhotos/${userObj?.profilePhoto}`} />
          </div>
        </div>
        <div className="pfp-data-div">
          <h3 className="text-center" style={{ fontFamily: 'mate', fontSize: '30px', marginTop: '0px' }}>{Name}</h3>
          <div>
            <div className="profile-info-row-div d-flex justify-content-between">
              <span className="profile-info-label">Gender</span>
              <span className="profile-info-data">{userObj.gender}</span>
            </div>
            <hr className="pfp-data-line" />
            <div className="profile-info-row-div d-flex justify-content-between">
              <span className="profile-info-label">Age</span>
              <span className="profile-info-data">{userObj.age}</span>
            </div>
            <hr className="pfp-data-line" />
            <div className="profile-info-row-div d-flex justify-content-between">
              <span className="profile-info-label">Anniversary Date</span>
              <span className="profile-info-data">{formatAnniversaryDate(userObj.anniversaryDate)}</span>
            </div>
            <hr className="pfp-data-line" />
            <div className="profile-info-row-div d-flex justify-content-between">
              <span className="profile-info-label">Partner Name</span>
              <span className="profile-info-data">{partnerName}</span>
            </div>
            <hr className="pfp-data-line" />
            <div className="profile-info-row-div d-flex flex-column justify-content-between">
              <span className="profile-info-label">Bio</span>
              <span className="profile-info-data" style={{ maxHeight: '80px', overflow: 'hidden' }}>{userObj.bio}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PartnerProfileCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uId: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    bio: PropTypes.string,
    gender: PropTypes.string,
    profilePhoto: PropTypes.string,
    partnerId: PropTypes.number,
    partnerUid: PropTypes.string,
    anniversaryDate: PropTypes.string,
    partnerCode: PropTypes.string,
  }).isRequired,
  partnerName: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
};
