import { useRouter } from 'next/router';
import MoodTagUpdate from '../../../../../components/Forms/MoodTagUpdate';

export default function UpdateMoodTagsPage() {
  const router = useRouter();
  const { journalIdTags } = router.query;

  return (
    <>
      <MoodTagUpdate journalId={journalIdTags} />
    </>
  );
}
