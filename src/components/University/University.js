import axios from 'axios';
import { useState } from 'react';
import './University.css';
const University = () => {
  const [title, setTitle] = useState('');
  const [univs, setUnivs] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const searchUniv = () => {
    setIsSearch(true);
    const endpoint = `http://universities.hipolabs.com/search?name=${title}`;
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setUnivs(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="univ-container">
      <h1>대학교 검색</h1>
      <div className="univ-search">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={searchUniv}>조회</button>
      </div>
      {isSearch && univs.length === 0 && <div>일치하는 학교가 존재하지 않습니다.</div>}
      {!isSearch && (
        <div>
          <h2>대학 검색 API 반환 정보</h2>
          <p>지역코드, 국가, 도메인, 학교명, 학교 홈페이지 주소</p>
        </div>
      )}
      {univs.length !== 0 &&
        univs.map((u) => (
          <div className="univ">
            <h1>{u.name}</h1>
            <div className="text">
              <p>지역 : {u.country}</p>
              <p>
                홈페이지 :{' '}
                <a href={u.web_pages[0]} target="_blank" rel="noreferrer">
                  {u.web_pages[0]}
                </a>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default University;
