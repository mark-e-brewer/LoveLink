import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  generatePartnerCode, handlePartnerCode, getUserWithMyMoodDTO,
} from '../API/Promises';

const initialState = {
  partnerCode: '',
};

function Home() {
  const { user, setIsUserLinked, isUserLinked } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [partnerCode, setPartnerCode] = useState('');
  // const [partnerUser, setPartnerUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [myMoodDto, setMyMoodDto] = useState({});
  const router = useRouter();

  const generateNewPartnerCode = () => {
    generatePartnerCode(user.id)?.then((data) => {
      setPartnerCode(data);
    });
  };

  const getCurrentUserMood = () => {
    if (user.id != null) {
      getUserWithMyMoodDTO(user.id)?.then((data) => {
        setMyMoodDto(data);
      });
    }
  };

  useEffect(() => {
    getCurrentUserMood((data) => {
      setMyMoodDto(data);
    });
  }, []);

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
        }
      });
  };

  return (
    <>
      {!isUserLinked ? (
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
      ) : (
        <>
          <div className="d-flex justify-content-center flex-column">
            <h1 className="d-flex justify-content-center">Welcome to LoveLink</h1>
            <Button
              className="nav-my-mood-form-btn"
              onClick={() => router.push(`/MyMood/${user?.id ? parseInt(user.id, 10) : ''}`)}
            >
              Set a Mood
            </Button>
            <h3 className="myMoodDisplayHome d-flex justify-content-center">My Mood: {myMoodDto?.myMood?.moodName}</h3>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
