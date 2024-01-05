import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  generatePartnerCode, handlePartnerCode,
} from '../API/Promises';

const initialState = {
  partnerCode: '',
};

function Home() {
  const { user, setIsUserLinked } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [partnerCode, setPartnerCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const generateNewPartnerCode = () => {
    generatePartnerCode(user.id)?.then((data) => {
      setPartnerCode(data);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parCode = formInput.partnerCode;
    handlePartnerCode(parCode, user.id)
      .then((response) => {
        if (response === 'Invalid partner code. Please try again.') {
          setErrorMessage(response);
        } else {
          setErrorMessage('');
          setIsUserLinked(true);
          setFormInput(initialState);
          router.push('/home');
        }
      });
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '75vh',
        padding: '30px',
        maxWidth: '666px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}</h1>
      <p>Please link your account with your partners before proceeding</p>
      <p>Click to generate a code, give this code to your partner to enter after their first log in.</p>
      <Button type="button" size="lg" className="copy-btn" onClick={generateNewPartnerCode}>Generate Code</Button>
      <h5>{partnerCode}</h5>
      <p>Enter a code your partner generated bellow.</p>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Partner Code" className="mb-3">
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Enter Partners Code"
            name="partnerCode"
            value={formInput.partnerCode}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}
        <Button type="submit">Link Your Partner</Button>
      </Form>
    </div>
  );
}

export default Home;
