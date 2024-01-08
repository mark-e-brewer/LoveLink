import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
      <h1 className="text-center details-title">{journal[4]}</h1>
      <h5 className="text-center details-entry">{journal[5]}</h5>
      <h4 className="text-center details-feelings">Feelings</h4>
      <p className="text-center details-down-arrow">↓</p>
      <h1 className="d-flex justify-content-center feelings-mood-display-details">{journal[8]?.map((moodTag) => <MoodTagDisplay moodTagObj={moodTag} />)}</h1>
      <div className="d-flex justify-content-between">
        <button className="details-update-btn" type="button" onClick={(() => router.push(`/Journal/Form/Edit/${journal[0]}`))}>Update</button>
        <button className="details-delete-btn" type="button" onClick={(() => deleteJournalById(journal[0]).then(() => router.push('/Journal')))}>Delete</button>
      </div>
    </>
  );
}

// 0:id 1:userId 2:partnerId 3:partnerUid 4:name 5:entry 6:dateEntered 7:visibility 8:moodTags
