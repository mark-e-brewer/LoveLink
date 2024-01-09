import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserById } from '../../API/Promises';
import { useAuth } from '../../utils/context/authContext';
import PartnerProfileCard from '../../components/PartnerProfileCard';

export default function PartnerProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [partnerUser, setPartnerUser] = useState({});
  const { PartnerId } = router.query;

  const getThePartnerUser = () => {
    getUserById(PartnerId)?.then((partnerData) => {
      setPartnerUser(partnerData);
    });
  };

  useEffect(() => {
    getThePartnerUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex flex-column">
        <h1 className="text-center" style={{ fontFamily: 'satisfy', fontSize: '54px', marginBottom: '30px' }}>Partners Profile</h1>
        <div>
          <PartnerProfileCard userObj={partnerUser} partnerName={user?.name} Name={partnerUser?.name} />
        </div>
      </div>
    </>
  );
}
