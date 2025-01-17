import { useState } from "react";
import axios from "axios";
import "./NewsListHanjin.css";
import { Link } from "react-router-dom";

export default function NewsListHanjin() {
    const [keyword, setKeyword] = useState("");  // 검색어 상태
    const [news, setNews] = useState([]);    // 뉴스 기사 상태
    const [isSearch, setIsSearch] = useState(false);  // 검색 여부 상태
    const [sortOrder, setSortOrder] = useState('desc');  // 정렬 방식 (내림차순: 'desc', 오름차순: 'asc')

    const searchNews = () => {
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요.");  // 검색어가 비어있을 경우 알림
            return;
        }

        setIsSearch(true); // 검색 시작
        const endpoint = `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${encodeURIComponent(keyword)}&format=json`;

        axios
            .get(endpoint)
            .then(res => {
                console.log(res); // 응답 확인
                setNews(res.data.items || []); // 응답에서 뉴스 데이터를 추출
            })
            .catch(err => {
                console.log(err);
                setNews([]); // 오류가 발생하면 뉴스 데이터를 비움
            });
    };

    // 뉴스 기사 정렬 (start_year 기준으로 내림차순 또는 오름차순 정렬)
    const sortedNews = [...news].sort((a, b) => {
        const yearA = a.start_year ? parseInt(a.start_year) : 0;
        const yearB = b.start_year ? parseInt(b.start_year) : 0;

        // 정렬 방식에 따라 내림차순('desc') 또는 오름차순('asc')으로 정렬
        return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
    });

    return (
        <div className="container">
            <h1 align="center">뉴스 기록 조회</h1>
            <div className="search">
                <input
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)} // 상태값 변경
                    placeholder="검색어 입력" // 검색어 입력란에 안내 텍스트 추가
                />
                <button onClick={searchNews}>조회</button>
            </div>

            {/* 검색 여부 및 결과 없을 때 안내 */}
            {isSearch && news.length === 0 && (
                <div>일치하는 뉴스 기사가 존재하지 않습니다.</div>
            )}

            {/* 검색된 결과 개수 표시와 정렬 방식 선택: 콤보박스를 나란히 배치 */}
            {isSearch && news.length > 0 && (
                <div className="result-and-sort">
                    <div>총 {news.length}개의 뉴스 기사가 검색되었습니다.</div>
                    
                    {/* 정렬 방식 선택: 콤보박스 */}
                    <div className="sort-options">
                        <select 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}  // 콤보박스에서 선택된 값으로 정렬 방식 변경
                        >
                            <option value="desc">최신 순</option>
                            <option value="asc">오래된 순</option>
                        </select>
                    </div>
                </div>
            )}

            {/* 초기 화면에 보여줄 안내 */}
            {!isSearch && <div align="center">조회할 키워드를 입력하세요.</div>}

            {/* 검색 결과 출력 (정렬된 뉴스 기사) */}
            {sortedNews.length > 0 && sortedNews.map((n, index) => (
                <div className="news" key={index}> {/* 고유 key 추가 */}
                    <div className="text">
                        <h1>{n.title || "제목 없음"}</h1>  {/* title이 없으면 기본값 "제목 없음" */}
                        <p> {n.publisher || "출판사 정보 없음"} , {n.start_year || "작성연도 없음"}</p> {/* publisher가 없으면 기본값 "출판사 정보 없음" */}
                        <p> {n.note || "별도 기록 없음"}</p>
                        <Link to={`https://chroniclingamerica.loc.gov/lccn/${n.lccn}`} >상세 보기</Link>  {/* URL로 상세 페이지 링크 */}
                    </div>
                </div>
            ))}
        </div>
    );
}