// src/App8.jsx 

import 'bootstrap/dist/css/bootstrap.css'

function App8() {
   
    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수를 만들어 두고 활용하자 
    function range(start, end){ // range(1, 10)  -> return: [1,2,3,4,5,6,7,8,9,10] range(6,10) -> return: [6,7,8,9,10]
        const result=[];
        for(let i=start; i<=end ;i++){
            result.push(i);
        }
        return result;
    }

    // API 서버로부터 받아온 페이지 정보라고 가정하자  
    const pageInfo ={
        startPageNum:8,
        endPageNum:10,
        totalPageCount:13,
        PageNum:3,
        list:[] // 글 목록 
    };
    
    // 페이지를 출력할 배열을 미리 준비한다 
    const pageArray = range(pageInfo.startPageNum, pageInfo.endPageNum);
   
    return (
        <div className="container">
            <h1>페이징 처리</h1>
            <ul className="pagination">
                <li className={`page-item ${pageInfo.startPageNum === 1 ? 'disabled': ''}`}>  {/** startPageNum 이 1 이면 누를 수 없고, 아니면 누를 수 있다 */}
                    <a className="page-link" href="#">Prev</a>
                </li>    
                {pageArray.map(num => 
                    <li className={`page-item ${pageInfo.PageNum === num ? 'active':''}`}> {/** 배열의 num 과 페이지 num 이 같으면 active */}
                        <a className="page-link" href="#">{num}</a>
                    </li>
                )}
                <li className={`page-item ${pageInfo.totalPageCount > pageInfo.endPageNum ? '' : 'disabled'}`}> {/** 전체페이지수 > 마지막페이지수 이면 next 에 링크*/}
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>


            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" href="#">Prev</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                    <a className="page-link active" href="#">2</a> {/** active 는 활성화된 현재 page를 표시  */}
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </div>
    );
}

export default App8;