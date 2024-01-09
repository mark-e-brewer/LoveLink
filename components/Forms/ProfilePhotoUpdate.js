import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { FloatingLabel, Form } from 'react-bootstrap';
import { updateProfilePhotoById } from '../../API/Promises';

const initialState = {
  profilePhoto: null,
};

export default function ProfilePhotoUpdateForm({ userObj, userID }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (userObj.id) {
      setFormInput({
        profilePhoto: null,
      });
    }
  }, [userObj]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (validExtensions.includes(`.${fileExtension}`)) {
        setFormInput((prevFormInput) => ({
          ...prevFormInput,
          [name]: file,
        }));
      } else {
        console.error('Invalid file type. Please select a valid image file.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.profilePhoto) {
      updateProfilePhotoById(formInput.profilePhoto, userID).then(() => {
        router.push('/profile');
        setFormInput(initialState);
      });
    } else {
      console.error('Please select a valid image file.');
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center" style={{ fontFamily: 'mate', marginBottom: '30px' }}>Upload Photo</h1>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Profile Photo" className="mb-3 pfp-update">
            <Form.Control
              className="form-input pfp-update"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              name="profilePhoto"
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <div className="d-flex justify-content-center">
            <button type="submit" className="pfp-update-form-submit">Update Photo</button>
          </div>
        </Form>
      </div>
    </>
  );
}

ProfilePhotoUpdateForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    profilePhoto: PropTypes.string,
  }).isRequired,
  userID: PropTypes.number.isRequired,
};
