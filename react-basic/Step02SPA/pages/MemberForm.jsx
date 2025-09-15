// src/pages/MemberForm.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Bread from "../components/Bread";


function MemberForm() {
    // javascript 로 라우팅할 수 있는 함수 얻어내기
    // navigate 라는 hook 을 사용한다. 
    const navigate = useNavigate();


    // 이벤트가 발생하면 이벤트 객체가 전달이되는데, 발생한 이벤트에 대한 정보가 들어있다.
    // e.preventDefault() 를 호출하면 이벤트가 발생한 그 요소의 참조값의 기본 동작을 만든다. 
    // form 의 기본동작은 action 에 명시한 경로대로 submit 
        // e.target 은 form 요소
        // input 요소의 값을 읽어오고 싶다? e.target.value 가 된다. 
        // action 요소의 값을 읽어오려면? e.target.action
        // 메소드 요소의 값을 읽어오려면? e.target.method 
        // 왜냐? 여기서 e.target 은 form 요소이기 때문에 

    //form 에 submit 이벤트가 발생했을때 실행할 함수
    const handleSubmit = (e)=>{
        //기본동작 막기(form 제출 막기)
        e.preventDefault();
        //이벤트가 발생한 요소의 참조값(form 요소의 참조값)
        const form=e.target;    
        //폼에 입력한 내용을 담고 있는 FormData 객체를 얻어낸다.
        const formData=new FormData(form);
        //폼에 입력한 내용을 object 로 변환
        const obj=Object.fromEntries(formData);
        //object 를 JSON 문자열로 변환
        const json = JSON.stringify(obj);
        //fetch() 함수를 이용해서 전송하기
        fetch(form.action, {
            method:form.method, //요청 method 
            headers:{"Content-Type":"application/json"}, //요청 header
            body:json //요청 body
        })
        // 이 fetch 요청은 @RequestBody 어노테이션을 가진 API 서버에서 처리 
        // 원래 폼 전송은 parameter 방식으로 name=kim&add=xxx 근데 여기는 json 문자열이 전송됨  
        .then(res=>res.json()) // json 문자열로 변환
        .then(data=>{ // json 으로 변환된 object 를 data 에 전달한다 이 json 문자열은 javascript 로 사용가능한 문자열이다 

            // 방금 추가한 회원의 정보가 data 에 들어있다  
            // "/members/x" 위치로 이동해야한다 (추가한 회원의 상세정보페이지)
            // <NavLink to="/members/x">이동<NavLink> 이런 링크를 눌른 효과를 내야한다 
            // javascript 로 routing 하는 방법이 있다. ( 위와 동일한 효과)
            // 위에서 선언해둔 navigate 함수를 이용하면 된다. 
            navigate(`/members/${data.num}?message=success`); // 이 data 에는 방금추가한 회원의 번호가 들어있다. 이걸 navigate 경로에 넣어준다
            // SPA 에서도 위와 같이 ?meesage=success 처럼 쿼리 파라미터를 전달할수도 있다. 
            // router 에서는 이런 정보(?meesage=success)도 추출할 수 있다.
            // MemberDetail component 에서 mmessage 라는 이름으로 success 가 넘어오는 경우에만 간단한 메세지를 띄우도록 할 수 있다.
            
            
        });
    };

    const bread =[
        {name:"Members", to:"/members"},
        {name:"New Form"}
    ];
    
    return (
        <>  <Bread list={bread}/>
            <h1 className="mt-3">회원 추가 양식</h1>
            <form action="/api/v1/members" onSubmit={handleSubmit} method="post">
                <div className="mt-3">
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="addr">주소</label>
                    <input type="text" name="addr" id="addr" />
                </div>
                <button className="mt-3 mb-3" type="submit">저장</button>
            </form>
        </>
    );
}


export default MemberForm;