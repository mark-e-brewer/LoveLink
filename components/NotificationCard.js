import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function NotificationCard({ notifObj }) {
  const happyMood = [1, 'Happy'];
  const calmMood = [2, 'Calm'];

  const formatAnniversaryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const getReceivingUserName = () => {
    if (notifObj?.receivingUserName !== null) {
      // Check the mood id and map to the corresponding mood name
      const moodId = parseInt(notifObj.receivingUserName, 10);
      switch (moodId) {
        case happyMood[0]:
          return happyMood[1];
        case calmMood[0]:
          return calmMood[1];
        // Add more cases for other moods as needed
        default:
          return 'N/A';
      }
    }
    return notifObj?.receivingUserName;
  };

  return (
    <>
      <Card className="d-flex" style={{ width: '50rem', height: '7rem', borderRadius: '10px' }}>
        <Card.Title>{notifObj?.title}</Card.Title>
        <Card.Body>{notifObj?.sourceUserName ? notifObj?.sourceUserName : getReceivingUserName()}</Card.Body>
        <Card.Text>{formatAnniversaryDate(notifObj?.dateSet)}</Card.Text>
      </Card>
    </>
  );
}

NotificationCard.propTypes = {
  notifObj: PropTypes.shape({
    id: PropTypes.number,
    sourceUserId: PropTypes.number,
    sourceUserName: PropTypes.string,
    receivingUserId: PropTypes.number,
    receivingUserName: PropTypes.string,
    title: PropTypes.string,
    dateSet: PropTypes.string,
    viewed: PropTypes.bool,
    linkToSource: PropTypes.string,
  }).isRequired,
};
