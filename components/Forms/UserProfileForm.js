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
  profilePhoto: '',
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
    const { name, value, files } = e.target;

    // eslint-disable-next-line no-nested-ternary
    const newValue = name === 'profilePhoto' ? (files ? files[0] : null) : value;

    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(formInput).forEach(([key, value]) => {
      // Convert string values to appropriate types
      switch (key) {
        case 'age':
        case 'partnerId':
          formData.append(key, parseInt(value, 10));
          break;
        case 'anniversaryDate':
          formData.append(key, new Date(value));
          break;
        default:
          formData.append(key, value);
      }
    });

    updateUserById(formData, userID).then(() => {
      console.log(formData);
      router.push('/profile');
      setFormInput(initialState);
    });
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, index) => currentYear - index);
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
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
          <FloatingLabel controlId="floatingInput1" label="Profile Photo" className="mb-3">
            <Form.Control
              className="form-input"
              type="file"
              name="profilePhoto"
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Anniversary Date" className="mb-3">
            <Form.Select
              className="form-input"
              name="anniversaryDate"
              value={formInput.anniversaryDate}
              onChange={handleChange}
            >
              <option value="">Select Anniversary Year</option>
              {generateYearOptions()}
            </Form.Select>
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
    profilePhoto: PropTypes.string,
    partnerId: PropTypes.number,
    partnerUid: PropTypes.string,
    anniversaryDate: PropTypes.string,
    partnerCode: PropTypes.string,
  }).isRequired,
  userID: PropTypes.number.isRequired,
};
