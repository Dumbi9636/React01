import React, { useState } from 'react';

function App3() {
    // 회원 목록을 상태값으로 관리하기
    const [members, setMembers] = useState([]); // 초기값은 빈배열, 이 빈배열을 서버로부터 받아오려고한다

    return (
        <div className="container">
            <button onClick={()=>{
                // 실제 데이터를 사용해보자
                fetch("/api/v1/members")
                .then(res=>res.json())
                .then(data=>{

                    // data 는 회원 목록이 들어있는 배열이다
                    // spring boot 서버로부터 받아온 데이터로 상태값을 변경하면 ui 가 업데이트된다. 
                    setMembers(data);
                });
                    
                // 상태값을 변경하면 함수가 다시 호출되면서 state 에 대입되는 값이 바뀐다
                // 그래서 아래의 item.num 에 값이 담겨서 출력이된다. 
            }}>받아오기</button>
            <h1>회원목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(item => <tr key={item.num}>
                        <td>{item.num}</td>
                        <td>{item.name}</td>
                        <td>{item.addr}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App3;
