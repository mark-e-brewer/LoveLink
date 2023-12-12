import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid, getUsersJournalsById } from '../../API/Promises';
import JournalSimple from '../../components/JournalSimple';

export default function JournalsHome() {
  const router = useRouter();
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);

  const getTheCurrentUserAndJournals = () => {
    getUserByUid(user.uid)?.then((data) => {
      getUsersJournalsById(data.id)?.then((journalsData) => {
        setJournals(journalsData);
      });
    });
  };

  useEffect(() => {
    getTheCurrentUserAndJournals();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 className="text-center m-2">Your Journal Entries</h1>
        <Button onClick={(() => router.push('/Journal/Form'))}>Add New Entry</Button>
      </div>
      <div className="d-flex flex-column justify-content-center text-center simple-journal-cards-div">
        {journals[4]?.map((journal) => <JournalSimple journalObj={journal} />)}
      </div>
    </>
  );
}
