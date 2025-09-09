// src/App4.jsx
// useState로 각각의 객체를 따로 상태관리하기 

import { useState } from "react";

export default function App4() {
  // 각각 따로 상태 관리
  const [text, setText] = useState("눌러보셈");
  const [state, setState] = useState("눌러봐");
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  const MOODS = ["😐", "🙂", "😄", "🤩", "🥱", "😴"];

  // 이모지 버튼 클릭
  const clicked = () => {
    if (index === MOODS.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <h1>state(상태값) 관리하기</h1>

      {/* text 변경 */}
      <button onClick={() => setText("clicked!")}>{text}</button>

      {/* state 변경 */}
      <button onClick={() => setState("clicked!")}>{state}</button>

      {/* count 증가 (0~9까지) */}
      <button onClick={() => setCount(count === 9 ? 0 : count + 1)}>
        {count}
      </button>

      {/* 이모지 순환 */}
      <button onClick={clicked}>{MOODS[index]}</button>
    </>
  );
}
