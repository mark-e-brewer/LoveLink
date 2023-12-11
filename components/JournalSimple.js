import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function JournalSimple({ journalObj }) {
  const formatEntryDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <>
      <Card className="d-flex" style={{ width: '20rem', height: '12rem' }}>
        <Card.Title style={{ color: 'black' }}>{journalObj.name}</Card.Title>
        <Card.Body>{journalObj.entry}</Card.Body>
        <Link href={`/Journal/${journalObj.id}`} passHref>
          View Details
        </Link>
        <Card.Footer>{formatEntryDate(journalObj.dateEntered)}</Card.Footer>
      </Card>
    </>
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
