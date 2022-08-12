/*

// 로그인 API 연동과정
1. #signin button 클릭
2. #userID, #password 값 확인 (두 값이 모두 입력되어 있지 않으면 return alert)
3. 위 값을 만족하면 로그인 API 요청
4. 요청이 성공적이지 않다면, alert message
5. 요청이 성공하면, jwt를 localstorage에 저장하고 main page로 이동

*/

let url = "https://www.myfoodymap.shop";

const btnSignIn = document.querySelector("#signin");

/* 1. #signin 클릭 */
btnSignIn.addEventListener("click", signIn);

async function signIn(event) {
  const userID = document.querySelector("#userID").value;
  const password = document.querySelector("#password").value;

  /* 2. #userID, #password 값 확인 (두 값이 모두 입력되어 있지 않으면 return alert) */
  if (!userID || !password) {
    return alert("올바른 회원정보를 입력해주세요.");
  }


  /* 3. 위 값을 만족하면 로그인 API 요청 */
  const signInReturn = await axios({
    method: "post", // http method
    url: url + "/sign-in",
    headers: {}, // packet header
    data: { userID: userID, password: password }, // packet body
  });

  /* 4. 요청이 성공적이지 않다면, alert message (axios에서 전달받은 code가 200번인가?) */
  const isValidSignIn = signInReturn.data.code == 200;
  if (!isValidSignIn) {
    return alert("요청에 문제가 생겼습니다."); 
  }

  /* 5. 요청에 성공하면, jwt를 localstorage에 저장하고 main page 이동 */
  const jwt = signInReturn.data.result.jwt;
  localStorage.setItem("x-access-token", jwt);
  alert(signInReturn.data.message);

  return location.replace("./index.html");
}