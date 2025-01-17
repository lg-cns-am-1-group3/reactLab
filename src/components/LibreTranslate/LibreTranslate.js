import axios from 'axios';
import { useEffect, useState } from 'react';
import './LibreTranslate.css';
function LibreTranslate() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('ko');
  const [targetLang, setTargetLang] = useState('en');
  const API_KEY = process.env.REACT_APP_TRANSLATE_API_KEY;

  const handleTranslate = async () => {
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
      const res = await axios.post(
        url,
        {
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(res);
      setTranslatedText(res.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTranslate();
    }
  };

  useEffect(() => {
    console.log('Source Lang:', sourceLang);
    console.log('Target Lang:', targetLang);
  }, [sourceLang, targetLang]);

  return (
    <div className="translate-container">
      <h1> 번역 </h1>
      <div className="language-select-group">
        <label>Select Source Language: </label>
        <select
          className="language-select"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="ko">Korean</option>
        </select>
      </div>
      <div className="language-select-group">
        <label>Select Target Language: </label>
        <select
          className="language-select"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="ko">Korean</option>
        </select>
      </div>
      <div className="textarea-group">
        <textarea
          className="translate-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="내용을 입력하세요."
          rows={5}
        />
      </div>
      <button className="translate-button" onClick={handleTranslate}>
        Translate
      </button>
      {translatedText && (
        <div className="translated-text-container">
          <h2>translated Text: </h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
export default LibreTranslate;
