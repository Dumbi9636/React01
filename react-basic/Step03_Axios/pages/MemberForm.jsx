// src/pages/MemberForm.jsx

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MemberForm() {
    
    // 필드 에러 정보를 상태값을 관리한다
    const [errors, setErrors] = useState({}); // <- { } 에는 "name: 이름은 20글자 미만으로 작성해주세요"
 
    //javascript 로 라우팅할수 있는 함수 얻어내기
    const navigate = useNavigate();
    
    //form 에 submit 이벤트가 발생했을때 실행할 함수
    const handleSubmit = (e)=>{
        //기본동작 막기(form 제출 막기), 페이지 전환이 일어나면 안되니까
        e.preventDefault();
        //이벤트가 발생한 요소의 참조값을 얻어와서(form 요소의 참조값)
        const form=e.target;    
        //폼에 입력한 내용을 담고 있는 FormData 객체를 얻어낸다. (클라이언트가 입력한 내용)
        const formData=new FormData(form);
        //폼에 입력한 내용을 object 로 변환 (axios 가 내부적으로 json.stringfy 해서 json으로 만들어서 api 서버에 전송한다)
        const obj=Object.fromEntries(formData);

        // axios 를 이용해서 post 방식 요청하기
        axios.post("/api/v2/members", obj) // 전송할게 있으면 obj 만 넣어주면 된다. 
        .then(res => {
            // res.data 는 방금 추가한 회원의 정보이다
            console.log(res.data);
            // 추가한 회원의 자세히 보기로 이동
            // /members/new -> /members/105 처럼 바꿔야함 그럴려면 뒤에 회원의 primary key 인  num 을 넣어줘야한다
            navigate(`/members/${res.data.num}`, // navigate 후에 옵션을 전달할 수도 있다
                // state 라는 key 값으로 obejct 전달
                {state:{
                    message:"새로 추가된 회원입니다"} // 원하는 key 로 원하는 obejct 를 전달 
                });  
        })
        .catch(err => {
            // err 는 에러 정보를 담고 있는 object 이다 
            console.log(err); // 에러정보가 있다면 catch 블록이 실행된다

            // 필드 에러 객체를 상태값에 넣어준다
            setErrors(err.response.data.errors);
          
        }); 
    };
   

    return <>
       
        <h1>회원 추가 양식</h1>
        {/** onSubmit: submit 이벤트가 발생했을때 실행할 함수
        *    form 요소에 입력한 내용을 object 로 변경
        *    name, addr 를 이용해서 object ,{name:"xxx", addr:"yyy"} 를 만들어내는 것
        *    
        */}
        <form action="/api/v1/members" method="post" onSubmit={handleSubmit}> 
            <div className="mb-3">
                <label className="form-label" htmlFor="name">이름</label>
                <input className="form-control" type="text" name="name" id="name"/>
                {/* 필드 에러 객체에 name 에러 정보가 있으면 에러 정보를 출력한다 */}
                { errors.name && <p className="form-text text-danger">{errors.name}</p>}
                {/** && 는 만약에 errors.name 에 데이터가 존재한다면 {errors.name} 을 출력해라 라는 의미 
                 *  NOT NULL, NOT UNDEFINED ... 
                */}
            </div>
            <div>
                <label className="form-label" htmlFor="addr">주소</label>
                <input className="form-control" type="text" name="addr" id="addr"/>
                {/* 필드 에러 객체에 name 에러 정보가 있으면 에러 정보를 출력한다 */}
                { errors.addr && <p className="form-text text-danger">{errors.addr}</p>}
            </div>
            <button className="btn btn-success" type="submit" onClick="">저장</button>
        </form>
    </>
}

export default MemberForm;