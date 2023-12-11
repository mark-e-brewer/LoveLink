import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid, getUsersJournalsById } from '../../API/Promises';
import JournalSimple from '../../components/JournalSimple';

export default function JournalsHome() {
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const [journals, setJournals] = useState([]);

  const getTheCurrentUserAndJournals = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
      getUsersJournalsById(data.id)?.then((journalsData) => {
        setJournals(journalsData);
      });
    });
  };

  useEffect(() => {
    getTheCurrentUserAndJournals();
    console.log(currUser);
  }, []);

  return (
    <>
      <h1 className="text-center">Your Journal Entries</h1>
      <div className="d-flex justify-content-center">
        {journals[4]?.map((journal) => <JournalSimple journalObj={journal} />)}
      </div>
    </>
  );
}
