import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUsersJournalsById } from '../../API/Promises';
import JournalSimplePartner from '../../components/JournalSimplePartnerHome';

export default function AllPartnerJournals() {
  const router = useRouter();
  const [journals, setJournals] = useState([]);
  const { partnerId } = router.query;

  const getThePartnersJournals = () => {
    getUsersJournalsById(partnerId)?.then((journalsData) => {
      setJournals(journalsData);
    });
  };

  useEffect(() => {
    getThePartnersJournals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 className="text-center m-2">Partner Journal Entries</h1>
      </div>
      <div className="d-flex flex-column justify-content-center text-center simple-journal-cards-div">
        {journals[4]?.map((journal) => <JournalSimplePartner journalObj={journal} />)}
      </div>
    </>
  );
}
