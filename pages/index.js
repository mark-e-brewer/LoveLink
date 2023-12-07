import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import {
  generatePartnerCode, handlePartnerCode, getUserByUid, getUserById, getUserWithMyMoodDTO,
} from '../API/Promises';

const initialState = {
  partnerCode: '',
};

function Home() {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [partnerCode, setPartnerCode] = useState('');
  const [currUser, setCurrUser] = useState({});
  const [partnerUser, setPartnerUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isUserLinked, setIsUserLinked] = useState(false);
  const [myMoodDto, setMyMoodDto] = useState({});

  const getTheCurrentUser = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
    });
  };

  const getThisUserPartner = () => {
    getUserById(currUser.partnerId)?.then((data) => {
      setPartnerUser(data);
    });
  };

  useEffect(() => {
    getTheCurrentUser();
  }, [user]);

  const generateNewPartnerCode = () => {
    generatePartnerCode(currUser.id)?.then((data) => {
      setPartnerCode(data);
    });
  };

  useEffect(() => {
    console.log(currUser.partnerId);
    if (currUser.partnerId != null) {
      getThisUserPartner();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currUser]);

  const getCurrentUserMood = () => {
    getUserWithMyMoodDTO(currUser.id)?.then((data) => {
      setMyMoodDto(data);
    });
  };

  useEffect(() => {
    getCurrentUserMood((data) => {
      setMyMoodDto(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parCode = formInput.partnerCode;
    handlePartnerCode(parCode, currUser.id)
      .then((response) => {
        if (response === 'Invalid partner code. Please try again.') {
          // Show error message
          setErrorMessage(response);
        } else {
          // Reset error message
          setErrorMessage('');
          // Clear the form input box
          setFormInput(initialState);
          getTheCurrentUser();
        }
      });
  };

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (currUser?.partnerId === partnerUser?.id) {
      console.log('Linked');
      setIsUserLinked(true);
    } else {
      console.log('Not Linked');
      setIsUserLinked(false);
      getTheCurrentUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(myMoodDto?.myMood?.moodName);
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
          <h1 className="d-flex justify-content-center">Welcome to LoveLink</h1>
          <h3 className="myMoodDisplayHome d-flex justify-content-center">My Mood: {myMoodDto?.myMood?.moodName}</h3>
        </>
      )}
    </>
  );
}

export default Home;
