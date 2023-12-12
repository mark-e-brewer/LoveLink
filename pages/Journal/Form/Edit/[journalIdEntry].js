import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../utils/context/authContext';
import { getJournalByIdNoTags, getUserByUid } from '../../../../API/Promises';
import JournalForm from '../../../../components/Forms/JournalForm';

export default function UpdateJournalPage() {
  const [journal, setJournal] = useState({});
  const [currUser, setCurrUser] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { journalIdEntry } = router.query;

  const getThisUser = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
    });
  };

  const getThisJournal = () => {
    getJournalByIdNoTags(journalIdEntry)?.then((data) => {
      setJournal(data);
    });
  };

  useEffect(() => {
    getThisUser();
    getThisJournal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Update This Entry</h1>
      <JournalForm userObj={currUser} userID={currUser.id} journalObj={journal[0]} />
    </>
  );
}
