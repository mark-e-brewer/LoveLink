import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { updateUserById } from '../../API/Promises';

const initialState = {
  name: '',
  uId: '',
  age: 0,
  bio: '',
  gender: '',
  partnerId: 0,
  partnerUid: '',
  anniversaryDate: '',
  partnerCode: '',
};

export default function UserProfileForm({ userObj, userID }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (userObj.id) {
      setFormInput(userObj);
    }
  }, [userObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserById(formInput, userID)
      .then(() => {
        router.push('/profile');
        setFormInput(initialState);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Age" className="mb-3">
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter Your Age"
              name="age"
              value={formInput.age}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Bio" className="mb-3">
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter a Bio"
              name="bio"
              value={formInput.bio}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Gender" className="mb-3">
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter Gender/Pronouns"
              name="gender"
              value={formInput.gender}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Anniversary Date" className="mb-3">
            <Form.Control
              className="form-input"
              type="date"
              name="anniversaryDate"
              value={formInput.anniversaryDate}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Button type="submit" className="form-submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

UserProfileForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uId: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    bio: PropTypes.string,
    gender: PropTypes.string,
    partnerId: PropTypes.number,
    partnerUid: PropTypes.string,
    anniversaryDate: PropTypes.string,
    partnerCode: PropTypes.string,
  }).isRequired,
  userID: PropTypes.number.isRequired,
};
