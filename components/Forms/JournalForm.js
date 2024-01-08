import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { FloatingLabel, Form } from 'react-bootstrap';
import { createJournal, updateJournalById } from '../../API/Promises';

const initialState = {
  userId: 0,
  partnerId: 0,
  partnerUid: '',
  name: '',
  entry: '',
  visibility: 'Public',
};

export default function JournalForm({ journalObj, userID, userObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (journalObj.id) {
      setFormInput(journalObj);
    }
  }, [journalObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.id) {
      const patchPayload = { ...formInput };
      updateJournalById(patchPayload, formInput.id)?.then(() => {
        setFormInput(initialState);
        router.push(`/Journal/Form/Edit/Tags/${journalObj.id}`);
      });
    } else {
      const payload = {
        ...formInput,
        dateEntered: new Date().toISOString(),
        userId: userID,
        partnerId: userObj.partnerId,
        partnerUid: userObj.partnerUid,
      };
      createJournal(payload)?.then((response) => {
        router.push(`/Journal/Form/${response.id}`);
        console.warn(payload);
        setFormInput(initialState);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Journal Title" className="mb-3 new-journal-form-label">
          <Form.Control
            className="form-input new-journal-form-input"
            type="text"
            placeholder="Journal Entry Title"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Journal Content" className="mb-3 new-journal-form-label">
          <Form.Control
            as="textarea"
            className="form-input new-journal-form-input"
            placeholder="Write your journal entry here..."
            name="entry"
            value={formInput.entry}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="d-flex justify-content-center">
          <button type="submit" className="new-journal-content-submit">Submit</button>
        </div>
      </Form>
    </>
  );
}

JournalForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uId: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    bio: PropTypes.string,
    gender: PropTypes.string,
    profilePhoto: PropTypes.string,
    partnerId: PropTypes.number,
    partnerUid: PropTypes.string,
    anniversaryDate: PropTypes.string,
    partnerCode: PropTypes.string,
  }).isRequired,
  journalObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    partnerId: PropTypes.number,
    partnerUid: PropTypes.string,
    name: PropTypes.string,
    entry: PropTypes.string,
    dateEntered: PropTypes.string,
    visibility: PropTypes.string,
  }),
  userID: PropTypes.number.isRequired,
};

JournalForm.defaultProps = {
  journalObj: initialState,
};
