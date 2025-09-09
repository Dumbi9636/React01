// src/App4.jsx
// 객체 하나로 관리하기

// React 상태에서 state(상태값)을 관리하려면 import 필수 
import { useState } from "react";

// App4 라는 컴포넌트 정의. 컴포넌트는 화면을 구성하는 최소 단위
export default function App4(){

    let text ="눌러보셈";
    
    // data 는 object 이다
    // React에서 관리할 상태(state) 를 객체 하나로 묶은 것. 
    const [data, setData] = useState({ 
        state:"눌러봐",
        count:0,
        index:0
    });
    
    const MOODS = ["😐","🙂","😄","🤩","🥱","😴"];
     
    // 버튼을 눌렀을때 호출될 함수를 미리 만들어 두고 아래에서 활용한다
    const clicked = () => {
        if(data.index ==5){
            setData({
                ...data, // ...data 는 객체의 모든 속성(state, count, index)을 풀어서 새 객체에 복사
                index:0 // 그 중에서 바꾸고자하는 index 값을 0으로 덮어씌운다
            });
        }else{
            setData({
                ...data,
                index:data.index+1
            });
        }
    };
    
    return <>
        <h1>state(상태값) 관리하기</h1>
        <button onClick={()=>{
            text = "clicked!";
        }}>{text}</button>
    

        {/* spread 연산자 사용 ...data */}
        <button onClick={()=>{
            setData({
                ...data,
                state:"clicked!"
            });
        }}>{data.state}</button>
    

        {/* 버튼을 클릭하면 1씩 증가되도록 하기 */}
        <button onClick={()=>{
            if(data.count === 9){
                setData({
                    ...data,
                    count:0 //처음 컴포넌트가 렌더링될 때 사용할 값, 이미 존재하는 변수를 참조하는 게 아님(data.count) X
                });
            }else{
                setData({
                    ...data,
                    count:data.count+1
                });
            }
        }}>{data.count}</button>
        <button onClick={clicked}>{MOODS[data.index]}</button>
    </>
}