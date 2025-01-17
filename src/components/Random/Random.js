import React, { useState } from 'react';
import axios from 'axios';
import './Random.css';

const Random = () => {
  const [answerData, setAnswerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnswer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://yesno.wtf/api');
      setAnswerData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAnswerData({ answer: 'Error', image: '' });
    }
    setIsLoading(false);
  };

  return (
    <div className="yesno-container">
      <h1>Do You Need an Answer?</h1>
      <button onClick={fetchAnswer} disabled={isLoading}>
        {isLoading ? '잠시 기다려주세요 ...(~˘▾˘)~♫•*¨*•.¸¸♪' : 'Get Answer'}
      </button>
      {answerData && (
        <div className="answer-section">
          <h2>{answerData.answer.toUpperCase()}</h2>
          <img src={answerData.image} alt="Answer GIF" />
        </div>
      )}
    </div>
  );
};

export default Random;