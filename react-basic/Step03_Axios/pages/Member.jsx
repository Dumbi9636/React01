// src/pages/Member.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// useEffect 를 활용해서 api 요청하고 응답되는 data 를 상태값으로 관리해서 UI 에 출력하는 흐름 

function Member(){
    // 회원 목록을 상태값으로 관리
    const[members, setMembers] = useState([]);

    // 컴포넌트가 활성화되는 시점에 호출되는 함수
    // fetch 대신에 axios 를 활용한다 
    useEffect(()=>{
        // npm install axios 로 설치한 axios 를 이용해서 api 요청해보기 
        axios.get("/api/v1/members") // fetch 와 동일하게 promise 를 반환한다 
        .then(res => {
            console.log(res);
            // res.data 에 서버가 응답한 data 가 들어있다. 
            setMembers(res.data); // res.data 를 이용해서 상태값을 관리한다  
        })
        .catch(err => console.log(err));

    }, []);

    return <>
        {/** NavLink 는 routing 정보를 바꿀 때 사용하는 hoor
         *  그냥 a link 를 걸면 페이지만 새로고침이지, 데이터를 가져올 수가 없음 
         *  즉, React 에서 링크는 routing 정보를 변경하는 행위임 
         */}
        <NavLink to="/members/new">회원추가</NavLink>
        {/** navigate 라는 hook 을 이용해도 똑같은 동작을 할 수 있음
         *  const navigate = useNavigate(); 
         *  navigate("/member/new")
         *  ui를 통해 이동할 수도 있고, 특정 시점에 javascript 를 호출해서 이동할수도있다. 
         *
         */}
        <h1 className="mt-3 mb-3">회원목록</h1>
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>주소</th>
                    <th>자세히</th>
                </tr>
            </thead>
            <tbody>
                {members.map((item)=>
                    <tr key={item.num}>
                        <td>{item.num}</td>
                        <td>{item.name}</td>
                        <td>{item.addr}</td>
                        <td>
                            <NavLink to={`/members/${item.num}`}>보기</NavLink>
                            <Button as={NavLink} to={`/members/${item.num}`}>보기</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}
export default Member;