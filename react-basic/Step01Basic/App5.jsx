// src/App5.jsx

import React from 'react';

function App5() { // 최상위 root Component 
    // 부모가 자식 component 에서 사용될 데이터를 전달할 수도 있다.
    // 어떻게 전달하고 어떻게 받을까 .. ? 
    
    // 친구 목록을 Freinds Component 에  names 라는 속성과 키값으로 전달해보자 
    const names=["김구라", "해골", "원숭이"];

    return (
        <div className="container">
            <h1>ReactComponent 사용하기</h1>
            <Fortune/>
            <Fortune/>
            <Friends names={names}/>
            <Person person={"박준일"} color={"#00ff00"}/>
        </div>
    );
}

export default App5;
// 부모 component 가 전달한 속성값을 object 의 구조분해할당 문법을 이용해서 추출할수 있다. 
function Person({person, color}){ // object 의 구조를 분해할당 person 이라는 키값으로 
    return<>
        <p>오늘의인물: <strong style={{backgroundColor:color}}>{person}</strong></p>
    </>
}

// 다른곳에서 불러서 쓸 수 있는 함수형 ReactComponent 자식 Component
// names 는 args 라는 매개변수에 담긴다. 
function Friends(args){ // args 는 부모 component 가 전달한 속성(names)이 담겨 있는 object 이다. 
    // args.names 는 출력할 이름이 들어있는 배열이다. 
    return<>
        <h2>친구목록</h2>
        <ul>
            {args.names.map(item => <li>{item}</li>)}
        </ul>
    </>
}


// 다른 곳에서 불러서 쓸 수 있는 함수형 ReactComponent 자식 Component
function Fortune(){
    const style={
        color:"red",
        backgroundColor:"#00ff00"
    }
    // bean 요소 <></> xml 문법이기 때문에 부모 요소가 있어야한다. div 대신 bean 요소를 사용할 수 있다. 
    return <> 
        <h2 style={style}>오늘의 운세</h2>
        <p>동쪽으로 가면 귀인을 만나요</p>
    </>


}