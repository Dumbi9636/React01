// src/App3.jsx

import { useState } from "react";

export default function App3(){
    // jsx 객체가 들어있는 배열 
    const foods = [
        <li>김밥</li>,
        <li>라면</li>,
        <li>돈까스</li>
    ];

    // 배열에 들어있는 string 을 이용해서 
    const data = ["java", "jsp", "spring"]


    // li 요소 여러개가 들어있는 jsx 의 배열을 만들어서 아래에서 렌더링하기
    /*
        const programming1 = data.map((item)=>{
        return <li>{item}</li>;
        });

        위의 함수를 줄인 표현이 아래와 같다(람다식 표현)
        이 함수는 총 3번 호출이 된다. (item 의 갯수만큼) 
        결국은 li 3개가 호출이 되는 것
     
        아래 return 의 교육과정2 처럼 변수에 담지 않고 바로 사용할수도 있다
    */
    const programming1= data.map(item => <li>{item}</li>);
    /* data.map(...) 배열의 각 요소를 변환해서 새로운 배열 생성
    *  item => <li>{item}</li> → 배열의 각 원소(item)를 <li> 태그로 감싼 JSX로 변환
    */

    // 상태값을 이용해서 렌더링을 해보자
    const [state, setState] = useState([]); //초기값은 빈배열 
    // state는 초기에 빈 배열이나 특정시점에 state 를 변경시키면 .map () 함수가 동작한다



    return(
        <div className="container">
            <button>받아오기</button>
            <h1>음식 목록</h1>
            <ul>
                {foods}
            </ul>

            <h1>교육과정</h1>
            <ul>
                {programming1}
            </ul>

            <h1>교육과정2</h1>
            <ul>
                {data.map(item => <li>{item}</li>)}
            </ul>

            <h1>교육과정3</h1>
            <button onClick={()=>{
                // 원래는 빈배열[] 이였는데 새로운 배열로 상태값 변경하기
                // 아래의 {state.map(item => <li>{item}</li>)} 에 변경된 값이 들어가게 된다.
                setState(data);
            }}>출력하기</button>
            <ul> 
                {state.map(item => <li>{item}</li>)}
            </ul>
        </div>
    )
}