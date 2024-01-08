import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function NotificationCard({ notifObj }) {
  const moods = [
    [1, 'Happy'],
    [2, 'Calm'],
    [3, 'Mad'],
    [4, 'Frustrated'],
    [5, 'Anxious'],
    [6, 'Sad'],
    [7, 'Insecure'],
    [8, 'Avoidant'],
    [9, 'Excited'],
    [10, 'Confused'],
    [11, 'Intimate'],
    [12, 'Optimistic'],
    [13, 'Bored'],
    [14, 'Lonely'],
    [15, 'Guilty'],
    [16, 'Indifferent'],
    [17, 'Curious'],
  ];

  const formatAnniversaryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const getReceivingUserName = () => {
    if (notifObj?.receivingUserName !== null) {
      // Check the mood id and map to the corresponding mood name
      const moodId = parseInt(notifObj.receivingUserName, 10);
      const matchingMood = moods.find((mood) => mood[0] === moodId);
      return matchingMood ? matchingMood[1] : 'N/A';
    }
    return notifObj?.receivingUserName;
  };

  return (
    <>
      <Card className="d-flex" style={{ width: '25rem', height: '7rem', borderRadius: '10px' }}>
        <Card.Title>
          {notifObj.viewed === false && 'NEW! '}
          {notifObj?.title === 'New Journal Entry' ? `Partner Created ${notifObj?.title}` : notifObj?.title}
        </Card.Title>
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

// 1"Happy",2"Calm",3"Mad",4"Frustrated",5"Anxious",6"Sad",7"Insecure",8"Avoidant",9"Excited",10"Confused",11"Intimate",12"Optimistic",13"Bored",14"Lonely",15"Guilty",16"Indifferent",17"Curious";
