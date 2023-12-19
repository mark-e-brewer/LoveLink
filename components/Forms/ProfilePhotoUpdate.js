import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
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
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Profile Photo" className="mb-3">
            <Form.Control
              className="form-input"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              name="profilePhoto"
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Button type="submit" className="form-submit">Update Profile Photo</Button>
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
