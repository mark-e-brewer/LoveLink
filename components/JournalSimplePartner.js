import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function JournalSimplePartner({ journalObj }) {
  const formatEntryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Card className="mb-3">
      <Card.Title style={{ color: 'black', marginBottom: '0px' }}>{journalObj.name}</Card.Title>
      <Card.Body className="d-flex" style={{ marginTop: '0px' }}>{journalObj.entry}</Card.Body>
      <Link href={`/PartnerJournals/Details/${journalObj.id}`} passHref>
        View Details
      </Link>
      <Card.Footer>{formatEntryDate(journalObj.dateEntered)}</Card.Footer>
    </Card>
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
