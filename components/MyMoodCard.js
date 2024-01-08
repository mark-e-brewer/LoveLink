import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function MyMoodCard({ myMoodName }) {
  const { user } = useAuth();
  const router = useRouter();

  const moodEmojis = {
    Happy: '😊',
    Calm: '😌',
    Mad: '😡',
    Frustrated: '😤',
    Anxious: '😰',
    Sad: '😢',
    Insecure: '🥺',
    Avoidant: '😓',
    Excited: '😃',
    Confused: '😕',
    Intimate: '😍',
    Optimistic: '😎',
    Bored: '😐',
    Lonely: '😔',
    Guilty: '😳',
    Indifferent: '😑',
    Curious: '🤔',
  };

  const emoji = moodEmojis[myMoodName] || '🚫';

  return (
    <div className="my-mood-card">
      <h2 className="card-title-my-mood">My Mood</h2>
      <span role="img" aria-label="emoji-my-mood" className="emoji-my-mood">
        {emoji}
      </span>
      <h3 className="myMoodDisplayHome moodNameDisplay">{myMoodName}</h3>
      <button
        type="button"
        className="nav-my-mood-form-btn my-mood-card-btn"
        onClick={() => router.push(`/MyMood/${user?.id ? parseInt(user.id, 10) : ''}`)}
      >
        Set Mood ↗
      </button>
    </div>
  );
}

MyMoodCard.propTypes = {
  myMoodName: PropTypes.string.isRequired,
};
