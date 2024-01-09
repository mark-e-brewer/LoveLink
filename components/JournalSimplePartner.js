import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function JournalSimplePartner({ journalObj }) {
  const router = useRouter();
  const formatEntryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="journal-simple-partner-div">
      <p style={{ textAlign: 'left' }} className="journal-simple-date-partner">
        {formatEntryDate(journalObj.dateEntered)}
      </p>
      <p style={{ color: 'black', marginBottom: '0px', textAlign: 'left' }} className="journal-simple-title-partner">
        {journalObj.name}
      </p>
      <p
        className="d-flex journal-simple-partner-entry"
        style={{
          marginTop: '0px',
          textAlign: 'left',
          overflow: 'hidden',
          maxHeight: '100px',
          textOverflow: 'ellipsis',
        }}
      >
        {journalObj.entry.length > 288 ? `${journalObj.entry.slice(0, 288)}...` : journalObj.entry}
      </p>
      <button className="journal-view-details-partner" type="button" onClick={(() => router.push(`/PartnerJournals/Details/${journalObj.id}`))}>
        View Details
      </button>
    </div>
  );
}

JournalSimplePartner.propTypes = {
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
