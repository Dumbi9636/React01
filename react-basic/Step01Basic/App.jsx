// 사용할 자원을 import 해서 쓸 수 있다
import koreaImg from './assets/images/SouthKorea.png'
// css 로딩
import './assets/css/custom.css'
// npm install bootstrap 해서 설치한 이후에 bootstrap css 로딩하기
import 'bootstrap/dist/css/bootstrap.css'



function App() {
  // react 에서 inline css 는 object 로 작성한다
  const myStyle={
    width:"200px",
    height:"200px",
    border:"1px solid green",
    borderRadius:"50%"
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">인덱스 페이지</h1>
      <hr />
      <img className="mt-3 mb-3" src={koreaImg} alt="대한민국 이미지" style={myStyle} />
      <br />
      <button className="btn btn-primary mt-3" onClick={()=>{
        //fetch는 서버랑 통신해서 데이터를 가져오거나 보낼 수 있는 브라우저 내장 함수
        fetch("/api/v1/member/hello2")
        // .then(data)로 결과 처리
        .then(res=>res.json()) // 응답을 json 으로 변환
        .then(data=>{ // // 실제 데이터 사용
          console.log(data);
        });
      }}>버튼</button>
    </div>
  )
}

export default App
