// src/App3.jsx 파일

// import  
import { useState } from "react";

export default function(  ){
    let text ="눌러보셈";

    // 상태값을 관리해보자
    // 특정 시점에 UI 를 변경하려면 상태값을 변경하면된다.
    // 상태값 변경은 useState 를 사용하면된다(import 필요)
    /*
        - useState() 함수는 import 해야 사용할 수 있다
        - useState(초기값) 함수를 호출하면서 관리할 초기값을 전달한다(전달하면 초기값:null)
        - useState() 함수는 배열[] 을 리턴한다
        - 리턴한 배열의 0 번방에는 처음에는 전달한 초기값이 들어있고
        - 리턴한 배열의 1 번방에는 상태값을 변경할때 사용하는 함수가 들어있다
        - 특정 시점에 상태값을 변경하는 함수를 호출하면서 새로운 상태값을 전달하면 
          App3() 함수가 다시 호출된다
        - 그러면 useState() 가 리턴하는 배열의 0 번방에는 위에서 전달한 새로운 상태값이 들어있다
        - 배열의 1 번방에는 최초와 동일하게 상태값을 변경하는 함수가 들어있다
        - App3() 함수에서 리턴하는 jsx 객체로 UI 가 업데이트된다
        - 리턴하는 jsx 객체의 내용중에 새로운 상태값을 사용하는 부분이 있으면 그 부분의 UI가 변경되는 원리이다
    */
    const [state, setState] = useState("눌러봐");
    
    const [count, setCount] = useState(0);

    // 이모지의 인덱스 값으로 사용할 값을 상태값으로 관리한다 (초기값 0 ->컴포넌트가 처음 렌더링될 때만 적용)
    const [index, setIndex] = useState(0);

    const MOODS = ["😐","🙂","😄","🤩","🥱","😴"];
    
 
    // 버튼을 눌렀을때 호출될 함수를 미리 만들어 두고 아래에서 활용한다
    const clicked = () => {
      if(index ==5){
        setIndex(0);
      }else{
        setIndex(index+1);
      }
    };

    return <>
      <h1>state(상태값) 관리하기</h1>

      <button onclick={()=>{
        text = "clicked!";
      }}>{text}</button>

      <button onClick={()=>{
        setState("clicked!");
      }}>{state}</button>

      {/* 버튼을 클릭하면 1씩 증가되도록 하기 */}
      <button onClick={()=>{
        if(count === 9){
          setCount(0);
        }else{
          setCount(count+1);
        }
      }}>{count}</button>

      <button onClick={clicked}>{MOODS[index]}</button>
    </>
}