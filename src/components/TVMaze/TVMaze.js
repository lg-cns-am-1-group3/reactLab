import { useState } from 'react';
import axios from 'axios';
import './TVMaze.css';

export default function TVMaze() {
  const [title, setTitle] = useState('');
  const [shows, setShows] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const searchShow = () => {
    setIsSearch(true);
    const endpoint = `http://api.tvmaze.com/search/shows?q=${title}`;
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setShows(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (value.trim() === '') {
      setShows([]);
      setIsSearch(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setShows([]);
    setIsSearch(false);
  };

  return (
    <div className="container">
      <h1 onClick={handleReset} style={{ cursor: 'pointer', color: '#333' }}>
        TV 프로그램 조회
      </h1>
      <div className="search">
        <input
          className="tv-input"
          placeholder="검색할 TV 프로그램 제목을 입력하세요."
          type="text"
          value={title}
          onChange={handleInputChange}
        />
        <button className="tv-search-btn" onClick={searchShow}>
          조회
        </button>
      </div>

      {isSearch && shows.length === 0 && <div>일치하는 프로그램이 존재하지 않습니다.</div>}
      {(!isSearch || title.length === 0) && (
        <>
          <hr />
          <h2 className="tv-api">
            사용한 API:{' '}
            <p className="tv-subtitle">
              <a
                href="https://api.tvmaze.com/search/shows?q="
                target="_blank"
                rel="noopener noreferrer"
              >{`https://api.tvmaze.com/search/shows?q={검색한 TV 프로그램 제목}`}</a>
            </p>
          </h2>
          <ul className="tv-api-desc">
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.id</span> 프로그램 고유값 (number)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.url</span> 이름을 클릭한 프로그램의 TVmaze 웹사이트
              내 상세 페이지 URL (string)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.name</span> 프로그램 이름 (string)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.image</span> 프로그램 이미지 /{' '}
              <span className="tv-subtitle">show.image.original</span> 원본 크기의 이미지 URL
              (string)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.language</span> 방송 언어 (string)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.averageRuntime</span> 평균 러닝 타임 (number)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.genres</span> 장르 (array)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.rating.average</span> 평균 평점 (number)
            </li>
            <li className="tv-api-desc-item">
              <span className="tv-subtitle">show.summary</span> 프로그램 요약 설명 (HTML)
            </li>
          </ul>
        </>
      )}

      {title.length !== 0 &&
        shows.length !== 0 &&
        shows.map(({ show }) => {
          const { id, url, name, image, language, averageRuntime, genres, rating, summary } = show;

          return (
            <div className="show" key={id}>
              <div className="poster">
                {image && image.original ? (
                  <img src={image.original} alt={name} />
                ) : (
                  <>이미지 없음</>
                )}
              </div>
              <div className="tv-text">
                {url ? (
                  <a href={url} target="_blank" rel="noreferrer">
                    <h1 className="tv-name">{name}</h1>
                  </a>
                ) : (
                  <h1>{name}</h1>
                )}
                <p className="tv-subtitle">
                  언어 <p className="tv-content">{language}</p>
                </p>
                <p className="tv-subtitle">
                  평균 러닝 타임{' '}
                  {averageRuntime ? (
                    <p className="tv-content">{averageRuntime}분</p>
                  ) : (
                    <p className="tv-content">정보가 없습니다</p>
                  )}
                </p>
                {genres.length !== 0 ? (
                  <p className="tv-subtitle">
                    장르 <p className="tv-content">{genres.join(' | ')}</p>
                  </p>
                ) : (
                  <p className="tv-subtitle">
                    장르 <p className="tv-content">장르 정보가 없습니다</p>
                  </p>
                )}
                {rating.average ? (
                  <p className="tv-subtitle">
                    평점 <p className="tv-content">{rating.average}</p>
                  </p>
                ) : (
                  <p className="tv-subtitle">
                    평점 <p className="tv-content">평점 정보가 없습니다</p>
                  </p>
                )}
                <p className="tv-subtitle">
                  요약{' '}
                  {summary ? (
                    <div className="tv-summary" dangerouslySetInnerHTML={{ __html: summary }}></div>
                  ) : (
                    <p className="tv-content">요약 정보가 없습니다</p>
                  )}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
