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

    // If the input is a file input, use the File object
    const newValue = name === 'profilePhoto' ? files[0] : value;

    setFormInput({ ...formInput, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData to handle file uploads
    const formData = new FormData();
    Object.entries(formInput).forEach(([key, value]) => {
      formData.append(key, value);
    });

    updateUserById(formData, userID).then(() => {
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
              name="type"
              value={formInput.age}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Bio" className="mb-3">
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter a Bio"
              name="customerPhone"
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
              type="file" // Change the input type to "file"
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
