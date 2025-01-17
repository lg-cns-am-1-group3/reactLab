import React, { useState } from 'react';
import axios from 'axios';
import './NameInsight.css';

// NameInsight 컴포넌트
const NameInsight = () => {
  // 상태 설정
  const [name, setName] = useState('');
  const [genderInfo, setGenderInfo] = useState(null);
  const [popularityInfo, setPopularityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 성별 정보 API 호출
  const fetchGender = () => {
    setLoading(true);
    setError('');
    const genderEndpoint = `https://api.genderize.io/?name=${name}`;

    axios.get(genderEndpoint)
      .then(res => {
        setGenderInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch gender data. Please try again.');
        setLoading(false);
      });
  };

  // 인기도 정보 API 호출
  const fetchPopularity = () => {
    setLoading(true);
    setError('');
    const popularityEndpoint = `https://api.agify.io?name=${name}`;

    axios.get(popularityEndpoint)
      .then(res => {
        setPopularityInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch popularity data. Please try again.');
        setLoading(false);
      });
  };

  // 입력 값 초기화
  const clearInput = () => {
    setName('');
    setGenderInfo(null);
    setPopularityInfo(null);
    setError('');
  };

  return (
    <div className="name-insight-container">
      <h1>Name Insight</h1>
      <p>This page uses the Genderize.io and Agify.io APIs</p> {/* API 설명 추가 */}
      <div>
        <input className="gender-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
        <button className="gender-btn" onClick={fetchGender}>Get Gender</button>
        <button className="gender-btn" onClick={fetchPopularity}>Get Popularity</button>
        <button className="gender-btn" onClick={clearInput}>Delete</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {genderInfo && (
        <div>
          <p><span className="name-label">Name:</span> {genderInfo.name}</p>
          <p><span className="gender-label">Gender:</span> {genderInfo.gender}</p>
          <p><span className="probability-label">Probability:</span> {genderInfo.probability}</p>
        </div>
      )}
      {popularityInfo && (
        <div>
          <p><span className="popularity-label">Popularity Count:</span> {popularityInfo.count}</p>
          <p><span className="age-label">Average Age:</span> {popularityInfo.age}</p>
        </div>
      )}
    </div>
  );
};

export default NameInsight;
