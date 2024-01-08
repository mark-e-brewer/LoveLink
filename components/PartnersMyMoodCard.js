import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function PartnersMyMoodCard({ partnerMoodName }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="partners-my-mood-card">
      <h2 className="card-title-my-mood">Partners Mood</h2>
      <span role="img" aria-label="emoji-my-mood" className="emoji-my-mood">
        😊
      </span>
      <h3 className="partnersMoodDisplay moodNameDisplay">{partnerMoodName}</h3>
      <div className="button-container">
        <button type="button" className="view-partners-journals-btn my-mood-card-btn" onClick={() => router.push(`/PartnerJournals/${user?.partnerId}`)}>
          Journals ↗
        </button>
        <button className="my-mood-card-btn" type="button" onClick={() => router.push(`/PartnerProfile/${user?.partnerId}`)}>
          Profile ↗
        </button>
      </div>
    </div>
  );
}

PartnersMyMoodCard.propTypes = {
  partnerMoodName: PropTypes.string.isRequired,
};
