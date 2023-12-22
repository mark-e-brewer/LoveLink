import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllMyMoods } from '../../API/Promises';
import MyMoodform from '../../components/Forms/MyMoodForm';

export default function MyMoodFormPage() {
  const router = useRouter();
  const { userId } = router.query;
  const [myMoods, setMyMoods] = useState([]);

  const getAllTheMyMoods = () => {
    getAllMyMoods()?.then((data) => {
      setMyMoods(data);
    });
  };

  useEffect(() => {
    getAllTheMyMoods();
  }, []);

  return (
    <>
      <MyMoodform userID={parseInt(userId, 10)} myMoodsArray={myMoods} />
    </>
  );
}
