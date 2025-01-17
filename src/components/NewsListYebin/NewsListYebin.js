import axios from "axios";
import { useState, useEffect } from "react";

import "./NewsListYebin.css"
const NewsListYB = () => {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [p, setP] = useState(0);
  const [news, setNews] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const searchNews = (t) => {
    setIsSearch(true);
    var endpoint = `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${title}&format=json&page=${page}`;
    
    if (t !== null) {
      endpoint = `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${t}&format=json&page=${page}`;
    }

    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setNews(res.data.items);
        setP(0);
      })
      .catch((err) => {
        setNews([]);    
        console.log(err)
    });
  };

  const pageSelect = (n) => {
    if (n == 0) {
      if (p !== 0) {
        setP(p - 1);
      }
    }
    else {
      if (p < Math.floor(news.length / 15)) {
        setP(p + 1);
      }
    }
  }

  useEffect(() => {
    searchNews()
  }, [])

  return (
    <div className="news-yb-container">
      <h1>News</h1>
      <div className="news-yb-search">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={searchNews}>검색</button>
      </div>
      <div className="news-yb-search-example">
        <button onClick={() => {setTitle("New york"); searchNews("New york");}}> New york</button>
        <button onClick={() => {setTitle("1900"); searchNews("1900");}}>1900</button>
        <button onClick={() => {setTitle("USA"); searchNews("USA");}}>USA</button>
        <button onClick={() => {setTitle("January"); searchNews("January");}}>January</button>
      </div>
      {news.length == 0 && (
        <div>
          <h2>검색된 뉴스가 없습니다.</h2>
        </div>
      )}
      <div className="news-yb-container2">
        {news.length !== 0 &&
          news.slice(p * 15, (p+1)*15).map((n) => (
            <button className="news-yb" onClick={() => {window.open(`https://news.google.com/search?q=${n.title_normal}&hl=en-US&gl=US&ceid=US%3Aen`)}}>
              <h1>{n.title_normal}</h1>
              <div className="text">
                {n.note[0]}
                <p>
                  publisher :{n.publisher}
                </p>
              </div>
            </button>
          ))}
      </div>
      {news.length !== 0 && (
        <div style={{display:"flex", justifyContent: "space-between", padding:"20px"}}>
          <button style={{width:"100px", height:"30px", background:"white", border:"1px solid gray", borderRadius:"10%"}} onClick={() => {pageSelect(0)}}> 이전 페이지</button>
          <h3>{p+1} / {Math.floor(news.length / 15)+1}</h3>
          <button style={{width:"100px", height:"30px", background:"white", border:"1px solid gray", borderRadius:"10%"}} onClick={() => {pageSelect(1)}}> 다음 페이지</button>
        </div>
      )}
    </div>
  );
};
export default NewsListYB;
