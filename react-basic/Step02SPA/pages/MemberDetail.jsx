// src/pages/MemberDetail.jsx

import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Bread from '../components/Bread';
import ConfirmModal from '../components/ConfirmModal';


function MemberDetail() {
    // 자세히 보여줄 회원의 번호를 읽어와서
    // react router 에서 제공해주는 hook 을 이용해서
    // "/members/:num" 에서 num 에 해당하는 자세히 보여줄 회원의 번호를 얻어낸다
    const {num} = useParams(); // useParams 는 obejct type 을 리턴 {num}
    // useParams() 에 리턴되는 값이 오브젝트, {num:1, aaa:"kim", bbb:"xxx"} 이라고 가정한다면 
    // const {num} 은 여기서 num 의 값만 가져다 쓴다는 것이다. 그래서 member/#{num} 이 될때 배열에 해당되는 num 값이 들어간다. 
    // 이정보를 아래의 dto 라는 상태값으로 num 을 가져다 쓰는것이다.
    /*
        useParams() 는 URL 경로에 정의된 파라미터 값을 객체 형태로 리턴한다.
        예를 들어 라우트가 "/members/:num" 이고 현재 URL이 "/members/1" 라면
        useParams() 의 결과는 { num: "1" } 이다.
        따라서 const { num } = useParams(); 를 하면 num 값("1")만 바로 꺼내 쓸 수 있다.
    */ 

    // "/members/x?message=success" 에서 query 파라미터를 추출하기 위한 hook 
    const [params] = useSearchParams();
    //console.log(params);
    // "success or null 이다" 회원목록을 추가한 경우에만 success 를 리턴, 그냥 조회의 경우 null 을 리턴
    //console.log(params.get("message")); // get("파라미터명")

     

    // API 서버에 해당 회원 한명의 정보를 받아와서 ui 에 출력한다 
    const [dto, setDto] = useState({});
    // ConfirmModal 을 띄울지 여부를 상태값으로 관리한다
    const [showModal, setShowModal] = useState(false);
    
    useEffect(()=>{
        fetch(`/api/v1/members/${num}`) //API 서버로부터 회원 목록을 받아오고 
        .then(res=>res.json())
        .then(data => setDto(data)); 
    }, [num]);

    // <Location list /> 에 담을 배열 정보를 만들고 전달한다 
    const bread =[
        {name:"Members", to:"/members"},
        {name:"Detail"}
    ];
    // 삭제 후 이동하기 위해 navigate 호출 
    const navigate = useNavigate();

    // 삭제 확인을 눌렀을때 실행할 함수
    const handleYes = ()=>{
        fetch(`/api/v1/members/${dto.num}`, {
            method:"delete"
        })
        .then(res=>res.json())
        .then(data=>{
            navigate("/members");
        });
    };


    return <>
            <Bread list ={bread}/>
            {/* 참조되는 데이터가 있으면 출력, null 이면 출력 x  */}
            { params.get("message") && <Alert className="m-4" variant="success"><strong>저장했습니다</strong></Alert>}
            <h1>회원 자세히 보기</h1>
            <p>번호: <strong>{dto.num}</strong></p>
            <p>이름: <strong>{dto.name}</strong></p>
            <p>주소: <strong>{dto.addr}</strong></p>
            {/* 여기에 수정, 삭제 버튼을 만들고 동작하도록 만들어보세요 
                수정은 MemberUpdateForm.jsx 컴포넌트를 만들어서 동작하도록 하고 
                삭제는 정말로 삭제하시겠습니까? 라는 bootstrap Modal 을 띄워서 동작하도록 해보세요

                "/members/1/edit" => 수정 routing 경로 
            */}
            <Button variant="success" as={NavLink} to={`/members/${dto.num}/edit`}>수정</Button>
            <Button variant="danger" className="ms-1" onClick={()=>setShowModal(true)}>삭제</Button>
            <ConfirmModal show={showModal} 
                message="삭제 하시겠습니까?" 
                onCancel={()=>setShowModal(false)}
                onYes={handleYes}/> 
            
        </>
    
}

export default MemberDetail;