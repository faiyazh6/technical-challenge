import React, { useState } from 'react';

interface Props {
  selectedCourses: string[]; // Assuming selectedCourses is an array of course IDs
}

const ShareCourses: React.FC<Props> = ({ selectedCourses }) => {
  // State to store the generated shareable link
  const [shareableLink, setShareableLink] = useState<string>('');

  // Function to generate the shareable link
  const generateShareableLink = () => {
    if (!selectedCourses || selectedCourses.length === 0) {
      alert('Please select at least one course to share.');
      return;
    }

    // Encode the selected courses
    const encodedCourses = encodeURIComponent(JSON.stringify(selectedCourses));

    // Generate the shareable link
    const link = `${window.location.origin}/shared-courses?courses=${encodedCourses}`;

    // Set the shareable link in the state
    setShareableLink(link);
  };

  // Function to copy the shareable link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => alert('Link copied to clipboard'))
      .catch((error) => console.error('Failed to copy link: ', error));
  };

  return (
    <div>
      {/* Button to generate shareable link */}
      <button onClick={generateShareableLink}>Generate Shareable Link</button>

      {/* Display the shareable link */}
      {shareableLink && (
        <div>
          <p>Shareable Link:</p>
          <input type="text" value={shareableLink} readOnly />
          {/* Button to copy the link to clipboard */}
          <button onClick={copyToClipboard}>Copy Link</button>
        </div>
      )}
    </div>
  );
};

export default ShareCourses;