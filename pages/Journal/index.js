import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid, getUsersJournalsById } from '../../API/Promises';
import JournalSimple from '../../components/JournalSimple';

export default function JournalsHome() {
  const router = useRouter();
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);

  const getTheCurrentUserAndJournals = () => {
    getUserByUid(user.uid)?.then((data) => {
      getUsersJournalsById(data?.id)?.then((journalsData) => {
        const allJournals = journalsData[4] || [];
        const sortedJournals = allJournals?.sort((a, b) => new Date(b?.dateEntered) - new Date(a?.dateEntered));
        setJournals(sortedJournals);
      });
    });
  };

  useEffect(() => {
    getTheCurrentUserAndJournals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <h1 className="text-center m-2 journal-page-header">Your Journal</h1>
        <div className="d-flex justify-content-center new-journal-btn-div">
          <button type="button" className="new-journal-btn" onClick={(() => router.push('/Journal/Form'))}>New Entry +</button>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center text-center simple-journal-cards-div">
        {journals?.map((journal) => <JournalSimple journalObj={journal} />)}
      </div>
    </>
  );
}
