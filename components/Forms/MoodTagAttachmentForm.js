/* eslint-disable react/button-has-type */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addMoodTagsToJournalById, getAllMoodTags, updateMoodTagsInJournalById } from '../../API/Promises';

export default function MoodTagAttach({ journalID }) {
  const [selectedMoodTags, setSelectedMoodTags] = useState([]);
  const [allMoodTags, setAllMoodTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllMoodTags()
      .then((tags) => setAllMoodTags(tags))
      .catch((error) => console.error('Error fetching mood tags:', error));
  }, []);

  const handleCheckboxChange = (tagId) => {
    setSelectedMoodTags((prevSelected) => {
      if (prevSelected.includes(tagId)) {
        return prevSelected.filter((id) => id !== tagId);
      } else {
        return [...prevSelected, tagId];
      }
    });
  };

  const handleSubmit = () => {
    const apiFunction = journalID
      ? updateMoodTagsInJournalById
      : addMoodTagsToJournalById;
    apiFunction(journalID || 0, selectedMoodTags)
      .then((response) => {
        console.warn(response);
        router.push('/Journal');
      })
      .catch((error) => console.error('Error submitting mood tags:', error));
  };

  return (
    <div>
      <h1>Attach Moods You Felt!</h1>
      <div>
        <h2>Select Mood Tags</h2>
        {allMoodTags.map((tag) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              id={`moodTag-${tag.id}`}
              checked={selectedMoodTags.includes(tag.id)}
              onChange={() => handleCheckboxChange(tag.id)}
            />
            <label htmlFor={`moodTag-${tag.id}`}>{`Mood : ${tag.name}`}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

MoodTagAttach.propTypes = {
  journalID: PropTypes.number.isRequired,
};
