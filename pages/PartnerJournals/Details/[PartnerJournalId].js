import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getJournalByIdWithTags } from '../../../API/Promises';
import MoodTagDisplay from '../../../components/MoodTagDisplay';

export default function PartnerJournalDetailsHome() {
  const [journal, setJournal] = useState({});
  const router = useRouter();
  const { partnerJournalId } = router.query;
  const getPartnerJournal = () => {
    getJournalByIdWithTags(partnerJournalId)?.then((data) => {
      setJournal(data);
    });
  };

  useEffect(() => {
    getPartnerJournal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-center">{journal[4]}</h1>
      <h5 className="text-center">{journal[5]}</h5>
      <hr />
      <h4 className="text-center">What they were feeling</h4>
      <h1 className="d-flex justify-content-center">{journal[8]?.map((moodTag) => <MoodTagDisplay moodTagObj={moodTag} />)}</h1>
    </>
  );
}

// 0:id 1:userId 2:partnerId 3:partnerUid 4:name 5:entry 6:dateEntered 7:visibility 8:moodTags
