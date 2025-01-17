import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogBreed = () => {
  const [dogImage, setDogImage] = useState(''); // 강아지 사진 URL 상태 관리
  const [breeds, setBreeds] = useState({}); // 강아지 품종 리스트 상태 관리 (알파벳별로 그룹화)
  const [selectedLetter, setSelectedLetter] = useState(''); // 선택된 알파벳
  const [loadingImage, setLoadingImage] = useState(false); // 이미지 로딩 상태 관리
  const [loadingBreeds, setLoadingBreeds] = useState(false); // 품종 로딩 상태 관리

  // 모든 품종 리스트 가져오기
  useEffect(() => {
    const fetchBreeds = async () => {
      setLoadingBreeds(true);
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        const breedNames = Object.keys(response.data.message);
        // 품종을 알파벳 기준으로 그룹화
        const groupedBreeds = breedNames.reduce((acc, breed) => {
          const letter = breed[0].toUpperCase();
          if (!acc[letter]) acc[letter] = [];
          acc[letter].push(breed);
          return acc;
        }, {});
        setBreeds(groupedBreeds);
      } catch (error) {
        console.error('댕댕이 불러오기 실패:', error);
      } finally {
        setLoadingBreeds(false);
      }
    };

    fetchBreeds();
  }, []);

  // 랜덤 강아지 사진 가져오기 (품종 선택 시)
  const fetchBreedImage = async (breed) => {
    setLoadingImage(true);
    try {
      const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
      setDogImage(response.data.message);
    } catch (error) {
      console.error(`선택 품종 랜덤 이미지 불러오기 실패 ${breed}:`, error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      {/* 제목 */}
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🐕 랜덤 댕댕이 생성기 🐕</h1>

      {/* 이미지와 품종 리스트 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {/* 이미지 박스 */}
        <div
          style={{
            width: '350px',
            height: '350px',
            border: '2px dashed #ccc',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
            backgroundColor: '#fff',
            color: '#888',
          }}
        >
          {loadingImage ? (
            <p>댕댕이 찾는 중..</p>
          ) : dogImage ? (
            <img
              src={dogImage}
              alt="Random Dog"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          ) : (
            <p style={{ fontSize: '16px', textAlign: 'center' }}>
              강아지 품종을 선택해주세요. <br /> 랜덤으로 사진을 가져와요.
            </p>
          )}
        </div>

        {/* 품종 리스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '450px',
            height: '350px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* 알파벳 리스트 */}
          <div
            style={{
              width: '50px',
              borderRight: '1px solid #ccc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
              paddingTop: '10px',
              backgroundColor: '#f9f9f9',
              overflowY: 'scroll',
              maxHeight: '100%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {Object.keys(breeds).map((letter) => (
              <div
                key={letter}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  fontWeight: letter === selectedLetter ? 'bold' : 'normal',
                  color: letter === selectedLetter ? '#333' : '#888',
                  transition: 'color 0.2s',
                }}
                onClick={() => setSelectedLetter(letter)}
              >
                {letter}
              </div>
            ))}
          </div>

          {/* 선택된 알파벳의 품종 리스트 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px',
              backgroundColor: '#fff',
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                color: '#555',
                marginBottom: '10px',
              }}
            >
              {selectedLetter ? `${selectedLetter}로 시작하는 품종` : '알파벳을 선택해주세요'}
            </h3>
            {selectedLetter && breeds[selectedLetter] ? (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {breeds[selectedLetter].map((breed) => (
                  <li
                    key={breed}
                    style={{
                      marginBottom: '10px',
                      padding: '10px',
                      borderRadius: '5px',
                      backgroundColor: '#f1f1f1',
                      color: '#333',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'background-color 0.2s',
                    }}
                    onClick={() => fetchBreedImage(breed)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f1f1f1';
                    }}
                  >
                    {breed}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ textAlign: 'center', color: '#888' }}>품종 없음</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div
        style={{
          width: '780px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '10px' }}>REST API 정보</h2>
        <p>
          <strong>API 1:</strong> https://dog.ceo/api/breeds/list/all
        </p>
        <ul>
          <li>요청 방식: GET</li>
          <li>응답 구조:</li>
          <pre>{`{
  "message": {
    "affenpinscher": [],
    "african": [],
    "airedale": [],
    ...
  },
  "status": "success"
}`}</pre>
        </ul>
        <p>
          <strong>API 2:</strong> https://dog.ceo/api/breed/{'{'}breed{'}'}
          /images/random
        </p>
        <ul>
          <li>요청 방식: GET</li>
          <li>응답 구조:</li>
          <pre>{`{
  "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "status": "success"
}`}</pre>
        </ul>
      </div>
    </div>
  );
};

export default DogBreed;
