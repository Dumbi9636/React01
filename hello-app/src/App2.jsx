export default function App2( ){
  // 원격지 서버로부터 받아온 데이터라고 가정하자
  const names=["김구라", "해골", "원숭이"];
  // 위의 data 를 이용해서 <li> 요소 안에 이름이 출력된 배열 얻어내기 
  const list1=[];
  for(let i =0; i<names.length; i++){
      // names 배열의 i 번째 item 을 얻어내서 
      const item=names[i];
      // <li> 요소로 감싸서 배열에 추가한다.
        list1.push(<li>{item}</li>);
  }

  // 배열의 map( ) 함수를 이용하면 names 배열을 이용해서 jsx 배열을 한줄 coding 으로 얻어낼 수 있다.
  const list2 = names.map(item => <li>{item}</li>);
  // 서버가 li 를 여러개 출력한 게 아니라 웹브라우저에서 javascript 를 활용해서 서버로 받아온 데이터 names 를 이용해서 li 를 직접 렌더링 
  // 클라이언트사이드 렌더링
  return <>
    <h1>App2.jsx 파일</h1>
    <h2>친구 목록</h2>
    <ul>
        {list1}
    </ul>
    <h2>친구 목록2</h2>
    <ul>
        {list2}
    </ul>
    <h3>친구 목록3</h3>
    <ul>
        {names.map(item => <li>{item}</li>)}
    </ul>
  </>
}