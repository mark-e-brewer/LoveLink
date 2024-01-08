import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  getUserWithMyMoodDTO, getMostRecentUserJournal,
} from '../API/Promises';
import JournalSimplePartnerHome from '../components/JournalSimplePartnerHome';
import MyMoodCard from '../components/MyMoodCard';
import PartnersMyMoodCard from '../components/PartnersMyMoodCard';

export default function HomeLinked() {
  const { user } = useAuth();
  const [partnersLastJournal, setPartnerLastJournal] = useState({});
  const [partnerMyMoodDto, setPartnerMyMoodDto] = useState({});
  const [myMoodDto, setMyMoodDto] = useState({});
  // const router = useRouter();

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
      <div className="home-page-cont">
        <div className="d-flex justify-content-center flex-column">
          <h1 className="d-flex justify-content-center home-welcome">Welcome to <p className="welcome-love-link"> LoveLink</p></h1>
          <div className="mood-cards-div">
            <MyMoodCard myMoodName={myMoodDto?.myMood?.moodName} />
            <PartnersMyMoodCard partnerMoodName={partnerMyMoodDto?.myMood?.moodName} />
          </div>
          <hr />
        </div>
        <h2 className="text-center partner-last-journal-text">Partners Last Journal Entry</h2>
        <JournalSimplePartnerHome journalObj={partnersLastJournal} />
      </div>
    </>
  );
}
