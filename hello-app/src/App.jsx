import { useState } from 'react'

function App() {
  const message="안녕하세요 이제 시작이군요!";
  const p1 = <p>오이 이건 뭐지?</p>
  const names =["김구라, 해골, 원숭이"];
  const foods = [
    <li>라면</li>,
    <li>김밥</li>,
    <li>돈까스</li>
  ];

  return (
    <>              
        <h3>Hello React</h3>
        <button onClick={( )=>{ 
          alert("Hello React");    
        }}>눌러보셈</button>
        <p>{message}</p>
        {p1}
        <p>{names}</p>
         <ul>{foods}</ul>
    </>
  )
}

export default App
