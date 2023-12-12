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
    // Fetch the journal with mood tags when the component mounts
    getJournalByIdWithTags(journalId)
      .then((response) => {
        console.log('Full response:', response);

        if (Array.isArray(response) && response.length >= 9 && Array.isArray(response[8])) {
          const moodTags = response[8].map((tag) => tag.id);
          setAllMoodTags(moodTags);
          setSelectedMoodTags(moodTags);
        } else {
          console.warn('Mood tags not found in the response.');
        }
      })
      .catch((error) => console.error('Error fetching journal with mood tags:', error));

    // Fetch all mood tags
    getAllMoodTags()
      .then((tags) => setAllMoodTags(tags))
      .catch((error) => console.error('Error fetching all mood tags:', error));
  }, [journalId]);

  const handleCheckboxChange = (tagId) => {
    // Toggle the selected state of the mood tag
    setSelectedMoodTags((prevSelected) => {
      if (prevSelected.includes(tagId)) {
        return prevSelected.filter((id) => id !== tagId);
      } else {
        return [...prevSelected, tagId];
      }
    });
  };

  const handleSubmit = () => {
    // Call the API endpoint to update mood tags
    updateMoodTagsInJournalById(journalId, selectedMoodTags)
      .then((response) => {
        console.log(response);
        router.push('/Journal');
        // Handle success, e.g., show a success message or navigate to another page
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
            <label htmlFor={`moodTag-${tag.id}`}>{`Mood : ${tag.name}`}</label>
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
