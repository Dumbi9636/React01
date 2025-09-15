// src/pages/MemberUpdateForm.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {  NavLink, useNavigate, useParams } from 'react-router-dom';

function MemberEdit() {
    


    // 필드 에러 정보를 상태값을 관리한다
    const [errors, setErrors] = useState({}); // <- { } 에는 "name: 이름은 20글자 미만으로 작성해주세요"

    // "/members/:num/edit" 에서 num 에 전달된 값 읽어내기(수정할 회원의 번호)
    const {num} = useParams();

    // 수정할 회원의 정보를 상태값으로 관리하기
    const [dto, setDto] = useState({
        name:"",
        addr:""
    });

    // 기존 회원 정보 불러오기 (GET)
    useEffect(() => {
        axios.get(`/api/v1/members/${num}`)
        .then(res => setDto(res.data));
    }, []);


    // form의 input 요소에 입력한 값을 이용해서 상태값에 반영하기 위한 함수
    const handleChange = (e) =>{ // input 요소에 입력한 데이터의 참조값은 e
        setDto({
            ...dto, // 기존의 상태값인 dto 를 펼쳐놓고
            [e.target.name] : e.target.value
            /*
                겸용으로 사용하지 않는다면

                handleNameChange = (e) ={
                    name : e.target.value
                }
                handleAddrChange = (e) ={
                    addr : e.target.value
                }
                굳이 따로 만들 필요없이 name 속성을 잘 맞춰주기만 하면,
                handleChange 하나로 여러 개의 input을 동시에 처리할 수 있다
            */
        });
    }

    const navigate = useNavigate();

    // form 에 submit 이벤트가 발생했을때 실행할 함수
    const handleSubmit = async (e) =>{
        // 폼 제출 막기
        e.preventDefault();
        // e.target 은 form 요소
        // e.target.action 에 요청 경로 정보가 들어있다.
        // axios.put("요청 url", object) obejct 를 전달하면 자동으로 json 으로 변경
        try{
            await axios.put(e.target.action, dto);  
            alert(`${dto.num}번 회원 정보를 수정했습니다`);
            navigate(`/members/${num}`, {
                state:{
                    message:"수정된 회원입니다"}
            });
        }catch(err){ // 에러정보는 catch 블록안에 
            console.log(err);
            //필드 에러 객체를 상태값에 넣어준다 
            setErrors(err.response.data.errors);
        }
    }



    return (
        <>
          <h1 className="mt-3 mb-3"><i>{dto.num}</i>번 회원정보 수정 양식</h1>  
          <form action={`/api/v2/members/${dto.num}`} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">이름</label>
                <input className="for-control" onChange={handleChange} type="text" name="name" id="name" value={dto.name}/>
                 {/* 필드 에러 객체에 name 에러 정보가 있으면 에러 정보를 출력한다 */}
                { errors.name && <p className="form-text text-danger">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="addr">주소</label>
                <input className="for-control" onChange={handleChange} type="text" name="addr" id="addr" value={dto.addr}/>
                {/* 필드 에러 객체에 name 에러 정보가 있으면 에러 정보를 출력한다 */}
                { errors.addr && <p className="form-text text-danger">{errors.addr}</p>}
            </div>
            <button className="btn btn-success mt-3 mb-3" type="submit">수정확인</button>
          </form>
          <Button variant="secondary" as={NavLink} to={`/members/${dto.num}`}>취소</Button>
        </>
    );
}

export default MemberEdit;