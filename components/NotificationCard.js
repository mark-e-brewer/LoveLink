import React from 'react';
import PropTypes from 'prop-types';
import { deleteNotificationById } from '../API/Promises';

export default function NotificationCard({ notifObj, onUpdate }) {
  const deleteThisNotif = () => {
    if (window.confirm('Delete this Notification?')) {
      deleteNotificationById(notifObj?.id)?.then(() => onUpdate());
    }
  };

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
      const moodId = parseInt(notifObj.receivingUserName, 10);
      const matchingMood = moods.find((mood) => mood[0] === moodId);
      return matchingMood ? matchingMood[1] : 'N/A';
    }
    return notifObj?.receivingUserName;
  };

  return (
    <>
      <div
        className="d-flex flex-column notif-card"
        style={{
          width: '25rem', height: '7rem', borderRadius: '10px', position: 'relative',
        }}
      >
        <button
          type="button"
          className="delete-btn-notif"
          id="delete-notif"
          onClick={deleteThisNotif}
          style={{
            position: 'absolute', top: '8px', right: '8px', cursor: 'pointer', borderRadius: '20px', height: '28px', border: 'solid 1px rgb(226, 226, 226)', width: '28px', backgroundColor: '2px rgb(226, 226, 226)',
          }}
        >X
        </button>
        <p className="text-center notif-card-header">
          {!notifObj.viewed && <span className="new-notif">NEW! </span>}
          {notifObj?.title === 'New Journal Entry' ? `Partner Created ${notifObj?.title}` : notifObj?.title}
        </p>
        <p className="d-flex justify-content-around notif-content">{notifObj?.sourceUserName ? notifObj?.sourceUserName : getReceivingUserName()}</p>
        <p className="text-center notif-date" style={{ fontFamily: 'red hat mono', color: 'grey' }}>{formatAnniversaryDate(notifObj?.dateSet)}</p>
      </div>
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
  onUpdate: PropTypes.func.isRequired,
};

// 1"Happy",2"Calm",3"Mad",4"Frustrated",5"Anxious",6"Sad",7"Insecure",8"Avoidant",9"Excited",10"Confused",11"Intimate",12"Optimistic",13"Bored",14"Lonely",15"Guilty",16"Indifferent",17"Curious";
