import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUsersJournalsById } from '../../API/Promises';
import JournalSimplePartner from '../../components/JournalSimplePartner';

export default function AllPartnerJournals() {
  const router = useRouter();
  const [journals, setJournals] = useState([]);
  const { partnerId } = router.query;

  const getThePartnersJournals = () => {
    getUsersJournalsById(partnerId)?.then((journalsData) => {
      const sortedJournals = journalsData[4]?.sort((a, b) => new Date(b.dateEntered) - new Date(a.dateEntered));
      setJournals(sortedJournals);
    });
  };

  useEffect(() => {
    getThePartnersJournals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center partner-journal-page-header">
        <h1 className="text-center m-2">Partners Journal</h1>
      </div>
      <div className="d-flex flex-column justify-content-center text-center simple-journal-cards-div">
        {journals.map((journal) => (
          <JournalSimplePartner key={journal.id} journalObj={journal} />
        ))}
      </div>
    </>
  );
}
