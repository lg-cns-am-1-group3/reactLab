import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaChevronLeft } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <ul>
          <button className="prevBtn" onClick={() => navigate(-1)}>
            <FaChevronLeft />
          </button>
          <li>
            <Link to="/">
              <p className="title">홈</p>
              <p>&nbsp;</p>
            </Link>
          </li>
          <li>
            <Link to="/pokemon-ohhyungsuh">
              <p className="title">포켓몬</p>
            </Link>
            <p className="developer">오형서</p>
          </li>
          <li>
            <Link to="/university">
              <p className="title">대학</p>
            </Link>
            <p className="developer">이다빈</p>
          </li>
          <li>
            <Link to="/tvmaze">
              <p className="title">티비</p>
            </Link>
            <p className="developer">심수연</p>
          </li>
          <li>
            <Link to="/pokemon-poke-shy">
              <p className="title">포켓몬</p>
            </Link>
            <p className="developer">유승희</p>
          </li>
          <li>
            <Link to="/genderize">
              <p className="title">젠더라이즈</p>
            </Link>
            <p className="developer">윤다인</p>
          </li>
          <li>
            <Link to="/newslist-hanjin">
              <p className="title">뉴스리스트</p>
            </Link>
            <p className="developer">양한진</p>
          </li>
          <li>
            <Link to="/libretranslate">
              <p className="title">번역</p>
            </Link>
            <p className="developer">오태양</p>
          </li>
          <li>
            <Link to="/dogbreed">
              <p className="title">견종</p>
            </Link>
            <p className="developer">현민영</p>
          </li>
          <li>
            <Link to="/random">
              <p className="title">랜덤</p>
            </Link>
            <p className="developer">유영서</p>
          </li>
          <li>
            <Link to="/newslist-yebin">
              <p className="title">뉴스리스트</p>
            </Link>
            <p className="developer">신예빈</p>
          </li>
          <li>
            <Link to="/harrypotter">
              <p className="title">해리포터</p>
            </Link>
            <p className="developer">이상훈</p>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
