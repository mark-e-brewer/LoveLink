import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteJournalById, getJournalByIdWithTags } from '../../API/Promises';
import MoodTagDisplay from '../../components/MoodTagDisplay';

export default function JournalDetails() {
  const [journal, setJournal] = useState({});
  const router = useRouter();
  const { journalId } = router.query;
  const getThisJournal = () => {
    getJournalByIdWithTags(journalId)?.then((data) => {
      setJournal(data);
    });
  };

  useEffect(() => {
    getThisJournal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Button onClick={(() => router.push(`/Journal/Form/Edit/${journal[0]}`))}>Update Journal Entry</Button>
        <Button onClick={(() => deleteJournalById(journal[0]).then(() => router.push('/Journal')))}>Delete This Entry</Button>
      </div>
      <h1 className="text-center">{journal[4]}</h1>
      <h5 className="text-center">{journal[5]}</h5>
      <hr />
      <h4 className="text-center">What you were feeling</h4>
      <h1 className="d-flex justify-content-center">{journal[8]?.map((moodTag) => <MoodTagDisplay moodTagObj={moodTag} />)}</h1>
    </>
  );
}

// 0:id 1:userId 2:partnerId 3:partnerUid 4:name 5:entry 6:dateEntered 7:visibility 8:moodTags
