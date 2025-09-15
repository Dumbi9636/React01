// src/pages/MemberDetail.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

function MemberDetail() {
    // location 은 object 인데 location 객체가 가지고 있는 정보를 확인할 수 있다. 
    // const location =useLocation(); // state 라는 키값이 전달되는데 상황에 따라 null 일수도 있다
    
    // location 객체에서 state 정보만 얻어낸다(null 일수도 있음)
    const {state} = useLocation(); // useLocation() 은 object 를 반환하는데, state 값만 얻어낸다. 

    // ui 에 출력할 회원 정보를 state 값으로 관리한다
    const [dto, setDto] = useState({}); // {num:"xxx", name:"yyy", addr:"zzz"}

    // 경로변수에 있는 자세히 보여줄 회원의 num 값 읽어내기 
    const {num} = useParams(); // useParams 는 object 를 리턴 {num}, 구조분해할당이다. {num:10} 이면 num 에는 10이 들어감

    // 컴포넌트가 활성화되는 시점에 자세히 보여줄 회원의 정보를 api 로 부터 얻어낸다 
    // 자세히 보여줄 회원의 정보는 /members/1, /members/2 처럼 그때그때 달라진다. 
    // routing 경로의 /members/109 를 얻어오는 방법은 useParams 를 이용하면 된다. 
    useEffect(()=>{
        /*
        axios.get(`/api/v1/members/${num}`) // useParmas 로 읽어낸 경로변수의 num 값을 api 에 요청한다 
        .then(res=> setDto(res.data)) // 응답(res)이 오면 응답온 {num} 을 상태값(setDto)으로 변경하면 된다. 
        // 원래는 dto 가 빈 배열이였는데 api 에 요청한 데이터로 회원의 번호를 가져옴
        // 그리고 그걸 밑에서 출력( {dto.num} )해서 화면 ui 에 표시됨. 
        .catch(err=>console.log(err));
        */

       // 비동기로 동작하는 함수를 만들어서 바로 호출한다 ( useEffect 안에서 비동기 동작) 
       (async ()=>{
            try{
            // promise 가 해결(서버가 응답) 되면 res 에는 응답 객체가 대입된다.  
            const res = await axios.get(`/api/v1/members/${num}`)
            // 상태값 변경하기 
            setDto(res.data);
            }catch(err){
                console.log(err);
            }
       })(); // 함수를 만들어서 바로 호출 

    }, [])

    const navigate = useNavigate();

    // 함수 내부에 await 이 있기 때문에 async 예약어를 함수에 붙여준다
    const handleDelete = async () => {
        try{
        const res = await axios.delete(`/api/v1/members/${dto.num}`); // 응답된 데이터를 활용하지 않을 예정이라면 const res 는 지워도 됨
        alert("삭제되었습니다");
        navigate("/members");
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            {state && <Alert variant="info">{state.message}</Alert>}
            <h1 className="mt-3 mb-3">회원 정보 자세히 보기</h1>
            <div className="ms-3">
            <p>번호: <strong>{dto.num}</strong></p>
            <p>이름: <strong>{dto.name}</strong></p>
            <p>주소: <strong>{dto.addr}</strong></p>
            <Button variant="primary" as={NavLink} to={`/members/${dto.num}/edit`}>수정</Button>
            <Button variant="danger ms-2" onClick={handleDelete}>삭제</Button>
            <Button variant="secondary ms-2" as={NavLink} to ={`/members/`}>목록으로</Button>
            </div>
        </>
    );
}

export default MemberDetail;