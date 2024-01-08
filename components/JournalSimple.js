import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export default function JournalSimple({ journalObj }) {
  const router = useRouter();
  const formatEntryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="journal-simple-div">
      <p style={{ textAlign: 'left' }} className="journal-simple-date">{formatEntryDate(journalObj.dateEntered)}</p>
      <p style={{ color: 'black', marginBottom: '0px', textAlign: 'left' }} className="journal-simple-title">{journalObj.name}</p>
      <p
        className="d-flex journal-simple-entry"
        style={{
          marginTop: '0px', textAlign: 'left', overflow: 'hidden', maxHeight: '100px', textOverflow: 'ellipsis',
        }}
      >
        {journalObj.entry.length > 400 ? `${journalObj.entry.slice(0, 400)}...` : journalObj.entry}
      </p>
      <button className="journal-view-details" type="button" onClick={() => router.push(`/Journal/${journalObj.id}`)}>
        View Details
      </button>
    </div>
  );
}

JournalSimple.propTypes = {
  journalObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    partnerId: PropTypes.number,
    partnerUid: PropTypes.string,
    name: PropTypes.string,
    entry: PropTypes.string,
    dateEntered: PropTypes.string,
    visibility: PropTypes.string,
  }).isRequired,
};
