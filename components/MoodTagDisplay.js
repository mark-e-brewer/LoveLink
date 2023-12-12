import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function MoodTagDisplay({ moodTagObj }) {
  return (
    <>
      <Card className="d-flex m-1" style={{ width: '10rem', height: '10rem', borderRadius: '99px' }}>
        <Card.Title className="text-center mt-3" style={{ marginBottom: '0px', fontSize: '25px' }}>{moodTagObj.name}</Card.Title>
        <Card.Body className="text-center" style={{ fontSize: '15px', marginTop: '0px' }}>{moodTagObj.description}</Card.Body>
      </Card>
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
