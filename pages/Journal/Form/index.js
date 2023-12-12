import { useEffect, useState } from 'react';
import JournalForm from '../../../components/Forms/JournalForm';
import { useAuth } from '../../../utils/context/authContext';
import { getUserByUid } from '../../../API/Promises';

export default function NewJournalPage() {
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState({});
  const getTheCurrentUser = () => {
    getUserByUid(user.uid)?.then((data) => {
      setCurrUser(data);
    });
  };

  useEffect(() => {
    getTheCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Create New Entry</h1>
      <JournalForm userObj={currUser} userID={currUser.id} />
    </>
  );
}
