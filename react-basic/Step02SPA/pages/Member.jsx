// src/pages/Member.jsx
// 최상위 컴포넌트 / 에서 bootstrap 을 import 하면 프로젝트 전역에서 영향을 받기 때문에 
// bootstrap 을 import 하지 않아도 bootstrap 이 적용된다. 
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';


function Member() {

    // 숫자 UI 를 눌렀을때 "/members?pageNum=x" 에서 pageNum 을 추출하기 위해
    const [params] = useSearchParams();

    // 서버에서 응답받은 데이터를 상태값으로 관리한다 
    const [state, setState] = useState({
        list:[],
        pageNum:0,
        startPageNum:0,
        endPageNum:0,
        totalPageCount:0
    });



    // 컴포넌트가 활성화 될때 회원목록 받아오기(최초 1번) -> useEffect 를 사용
    // params 에 변경이 생긴하고 해서 useEffect 가 다시 호출되진 않는다. 
    // params 가 변경됐을대도 이 함수가 호출되게 하려면 [params] 도 전달해줘야한다
    useEffect(()=>{
        // params 정보를 읽어온다
        const pageNum = params.get("pageNum"); // null 일수 있음
        const condition = params.get("condition"); // null 일수 있음
        const keyword = params.get("keyword"); // null 일수 있음
        
        // api 서버에 요청할 query 문자열 구성 
        const qs = new URLSearchParams(); // 객체 생성 후에 하나씩 setting
        if(pageNum){
            qs.set("pageNum", pageNum); // null 이면 query 문자열로 구성이 되지 않는다 
        }
        if(keyword){
            qs.set("condition", condition);
            qs.set("keyword", keyword); // 파라미터에 keyword 가 있어야 condition + keyword 둘 다 들어간다 => 검색조건과 검색어는 항상 같이 있어야 한다
        }
        console.log(qs.toString());
        fetch(`/api/v2/members?${qs.toString()}`) // 파라미터값이 반영된 페이지를 API 서버에 요청
        .then(res=>res.json())
        .then(data => {
            // data 는 {list:[], pageNum:1, totalPageCount:x} 형식의 object이다
            setState(data);
        });
    }, [params]); // 여기에 params 를 넣어준다. 
    // 최종적으로 컴포넌트가 활성화 되거나 prams 가 변경이 될때 useEffect가 호출된다



    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수, PageArray 를 만들때 사용
    function range(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    // 페이지 번호를 출력할때 사용하는 숫자를 배열에 미리 준비한다 
    const pageArray = range(state.startPageNum, state.endPageNum);

    // 페이지 이동을 하기 위한 hook 
    const navigate = useNavigate();

    // 페이징 숫자를 눌렀을때 해당 페이지로 이동하는 함수
    const pageMove = (num) => { // num 이라는 함수가 전달되었을때 아래를 실행한다
        navigate(`/members?pageNum=${num}`) // navigate hook 을 이용해서 문자열로 num값의 파라미터를 전달한다

        // 현재 URLSearchParams 를 복사하고 
        const qs = new URLSearchParams(params);
        // pageNum 만 교체한다
        qs.set("pageNum", num);
        navigate(`/members?${qs.toString()}`);
    };

    // 검색조건(conditon) 키워드(keyword) 를 상태값으로 관리
    const [search, setSearch] = useState({
        // 조건과 키워드의 초기값 
        condition: "name_addr",
        keyword:""
    });
    
    // 검색조건에 변화가 생겼을때(검색조건에서 onChange 이벤트가 발생했을때) 호출할 함수
    const handleSearchChange = (e)=>{
        // setSearch 를 호출하면서 {} 새로운 값을 전달
        setSearch({
            ...search, // 초기값을 펼쳐놓고
            [e.target.name]:e.target.value // value 값을 변경시킨다
            // e.target.name 은 속성 이름(key) condition 또는 keyword 이다
            // e.target.value 는 속성 값(value)
        });
    };

    // 검색버튼을 눌렀을때 호출할 함수 
    const handleSearchClick = ()=>{
        // search 상태값 object 에 저장된 내용을 query 문자열로 변경한다 
        // query 문자열 : {conditon:"name_addr", keyword:"kim"} 이거를 => condition = name_addr&keyword=kim 형태의 쿼리문자열로 변경(요청 url 에 담겨가도록)
        const query = new URLSearchParams(search).toString(); // URLSearchParams 함수를 호출하면서 () 안에 search 라는 object 를 전달해주고, toString 함수로 변경한다 

        // 최종적으로 navigate 함수를 사용해서 "/members?condition=name_addr&keyword=kim" 이런 형식으로 주소창이 변경된다
        navigate(`/members?${query}`); 
        // params 가 쿼리파라미터로 변경되기 때문에 변경될대마다 다시 호출되는 useEffect 의 url 역시 수정해줘야한다 (쿼리파라미터도 들고갈 수 있도록)
    }


    return (
        <>
            <NavLink to="/members/new">회원추가</NavLink>
            <h1 className="mt-5 mb-5">회원 목록입니다</h1>
            <label htmlFor="condition">검색조건</label>
            <select onChange={handleSearchChange} value={search.condition} className="ms-2" name="condition" id="condition">
                    <option value="name_addr">이름+주소</option>
                    <option value="name">이름</option>
                    <option value="addr">주소</option>
            </select>
            <input onChange={handleSearchChange} value={search.keyword} className="ms-2" type="text" name="keyword" placeholder="검색어..." />
            <button onClick={handleSearchClick} className="ms-2">검색</button> 
            <table className="table table-stripted">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>자세히</th>
                    </tr>
                </thead>
                <tbody>
                    {state.list.map(item => 
                        <tr key={item.num}>
                            <td>{item.num}</td>
                            <td>{item.name}</td>
                            <td>
                                <NavLink to={`/members/${item.num}`}>보기</NavLink>
                            </td>
                        </tr>
                    )}
                </tbody>
           </table>
           {/** Reactbootstrap 의 Pagination 을 사용하면 간단하게 페이징 처리를 만들 수 있다
            *   Prev 는 조건 하에 동작해야한다. startpageNum이 1이면 Prev 는 없다.
            *   Next 역시 조건 하에 동작, endPageNum 다음의 페이지가 없다면 동작하지 말아야한다. 
            */}
           <Pagination>
                    <Pagination.Item
                        onClick={()=>pageMove(state.startPageNum-1)} // 시작 페이지는 0부터 시작하기 때문에 우리가 생각하는 페이지에서 -1 을 해준 값
                        disabled={state.startPageNum===1} // 
                    >
                    Prev
                    </Pagination.Item>

                    {/** UI 숫자 클릭시 해당 페이지로 이동 */}
                    {                                                   
                        pageArray.map(num =>       // pageMove 를 호출하면서 num 을 전달
                        <Pagination.Item 
                        onClick={()=>pageMove(num)} 
                        active={state.pageNum === num}
                        key={num}
                        > 
                        {num}
                        </Pagination.Item>) 
                    }
                    <Pagination.Item
                        onClick={()=>pageMove(state.endPageNum+1)} // next 버튼은 끝페이지의 다음 페이지가 됨
                        disabled={state.endPageNum=== state.totalPageCount} // 끝 페이지 번호 = 총 페이지수와 같을때 클릭하지 못함
                    >Next</Pagination.Item>     
           </Pagination>
        </>
    );
}

export default Member;