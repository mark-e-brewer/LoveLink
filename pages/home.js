import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  getUserWithMyMoodDTO, getMostRecentUserJournal,
} from '../API/Promises';
import JournalSimplePartnerHome from '../components/JournalSimplePartnerHome';

export default function HomeLinked() {
  const { user } = useAuth();
  const [partnersLastJournal, setPartnerLastJournal] = useState({});
  const [partnerMyMoodDto, setPartnerMyMoodDto] = useState({});
  const [myMoodDto, setMyMoodDto] = useState({});
  const router = useRouter();

  const getCurrentUserMoodAndPartner = () => {
    if (user.id != null) {
      getUserWithMyMoodDTO(user.id)?.then((data) => {
        setMyMoodDto(data);
        getUserWithMyMoodDTO(user.partnerId)?.then((partnerData) => {
          setPartnerMyMoodDto(partnerData);
        });
      });
    }
  };

  const getTheMostRecentPartnerJournal = () => {
    getMostRecentUserJournal(user?.partnerId)
      .then((data) => {
        setPartnerLastJournal(data);
        console.log(data); // Use 'data' here instead of 'partnersLastJournal'
      })
      .catch((error) => {
        console.error('Error fetching the most recent journal:', error);
      });
  };

  useEffect(() => {
    getCurrentUserMoodAndPartner();
    getTheMostRecentPartnerJournal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        <h3 className="text-center">Partners Mood: {partnerMyMoodDto?.myMood?.moodName}</h3>
        <hr />
      </div>
      <h2 className="text-center">Partners Last Journal Entry</h2>
      <JournalSimplePartnerHome journalObj={partnersLastJournal} />
      <div className="d-flex justify-content-between">
        <Button className="view-partners-journals-btn " onClick={(() => router.push(`/PartnerJournals/${user?.partnerId}`))}>
          View all their journals
        </Button>
        <Button onClick={(() => router.push(`/PartnerProfile/${user?.partnerId}`))}>
          View Partners Profile
        </Button>
      </div>
    </>
  );
}
