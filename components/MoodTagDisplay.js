import React from 'react';
import PropTypes from 'prop-types';

export default function MoodTagDisplay({ moodTagObj }) {
  const getEmojiByMood = (moodName) => {
    switch (moodName) {
      case 'Happy':
        return '😊';
      case 'Calm':
        return '😌';
      case 'Mad':
        return '😡';
      case 'Frustrated':
        return '😤';
      case 'Anxious':
        return '😰';
      case 'Sad':
        return '😢';
      case 'Insecure':
        return '🥺';
      case 'Avoidant':
        return '😓';
      case 'Excited':
        return '😃';
      case 'Confused':
        return '😕';
      case 'Intimate':
        return '😍';
      case 'Optimistic':
        return '😎';
      case 'Bored':
        return '😐';
      case 'Lonely':
        return '😔';
      case 'Guilty':
        return '😳';
      case 'Indifferent':
        return '😑';
      case 'Curious':
        return '🤔';
      default:
        return '❓';
    }
  };

  return (
    <>
      <div className="d-flex m-1 mood-tag-display-div" style={{ width: '6.5rem', height: '2.4rem', borderRadius: '99px' }}>
        <p className="text-center mt-3 mood-tag-display-name" style={{ marginBottom: '0px', fontSize: '16px' }}>
          {getEmojiByMood(moodTagObj.name)} {moodTagObj.name}
        </p>
        <p className="text-center" style={{ fontSize: '15px', marginTop: '0px' }}>{moodTagObj.description}</p>
      </div>
    </>
  );
}

MoodTagDisplay.propTypes = {
  moodTagObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
