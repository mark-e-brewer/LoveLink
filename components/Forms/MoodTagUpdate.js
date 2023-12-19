/* eslint-disable react/button-has-type */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getAllMoodTags, getJournalByIdWithTags, updateMoodTagsInJournalById } from '../../API/Promises';

export default function MoodTagUpdate({ journalId }) {
  const [selectedMoodTags, setSelectedMoodTags] = useState([]);
  const [allMoodTags, setAllMoodTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getJournalByIdWithTags(journalId)
      .then((response) => {
        console.warn('Full response:', response);

        if (Array.isArray(response) && response.length >= 9 && Array.isArray(response[8])) {
          const moodTags = response[8].map((tag) => tag.id);
          setAllMoodTags(moodTags);
          setSelectedMoodTags(moodTags);
        } else {
          console.warn('Mood tags not found in the response.');
        }
      })
      .catch((error) => console.error('Error fetching journal with mood tags:', error));

    getAllMoodTags()
      .then((tags) => setAllMoodTags(tags))
      .catch((error) => console.error('Error fetching all mood tags:', error));
  }, [journalId]);

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
    updateMoodTagsInJournalById(journalId, selectedMoodTags)
      .then((response) => {
        console.warn(response);
        router.push('/Journal');
      })
      .catch((error) => console.error('Error submitting mood tags:', error));
  };

  return (
    <div>
      <h1>Change Moods You Felt!</h1>
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
            <label htmlFor={`moodTag-${tag?.id}`}>{`Mood : ${tag?.name}`}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

MoodTagUpdate.propTypes = {
  journalId: PropTypes.string.isRequired,
};
