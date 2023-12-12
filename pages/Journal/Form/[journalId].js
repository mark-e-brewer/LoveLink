import { useRouter } from 'next/router';
import MoodTagAttach from '../../../components/Forms/MoodTagAttachmentForm';

export default function MoodTagAttachPage() {
  const router = useRouter();
  const { journalId } = router.query;

  return (
    <>
      <MoodTagAttach journalID={journalId} />
    </>
  );
}
