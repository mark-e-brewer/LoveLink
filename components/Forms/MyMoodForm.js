import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { postMyMoodToUser } from '../../API/Promises';

const initialState = {
  myMood: 0,
};

export default function MyMoodform({ userID, myMoodsArray }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedMood = myMoodsArray.find((moodObj) => moodObj.mood === formInput.myMood);
    if (selectedMood) {
      postMyMoodToUser(parseInt(userID, 10), parseInt(selectedMood.id, 10)).then(() => {
        setFormInput(initialState);
        router.push('/home');
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center" style={{ fontFamily: 'mate', marginBottom: '30px' }}>Let Your Partner Know How Your Feeling</h1>
        <Form onSubmit={handleSubmit} style={{ fontFamily: 'mate' }}>
          <Form.Group controlId="myMoodSelect">
            <Form.Select
              name="myMood"
              value={formInput.myMood}
              onChange={handleChange}
            >
              <option value={0}>Select Mood...</option>
              {myMoodsArray?.map((moodObj) => (
                <option key={moodObj.mood} value={moodObj.mood}>
                  {moodObj.mood}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button className="my-mood-submit-btn" type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

MyMoodform.propTypes = {
  userID: PropTypes.number.isRequired,
  myMoodsArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      userName: PropTypes.string,
      partnerId: PropTypes.number,
      partnerUid: PropTypes.string,
      mood: PropTypes.string.isRequired,
      notes: PropTypes.string,
      dateTimeSet: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
