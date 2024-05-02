class AuthService {

    signup(userId,username,password,email){
      fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId,username,password,email}),
        })
        .then(()=>{
          console.log('비밀번호가 변경되었습니다.')})
        .catch(error => console.error("회원가입 에러:",error));
    }

    login(userId, password) {
        fetch('http://localhost:4000/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, password }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            // JWT를 로컬 저장소에 저장
            localStorage.setItem('accessToken', data.accessToken);
          } else {
            console.error('JWT를 받아오지 못했습니다.');
          }
        })
        .catch(error => console.error('로그인 에러:', error));
      }

      // fetchUserData() {
      //   const jwt = localStorage.getItem('jwt');
        
      //   fetch('https://yourapi.com/user/data', {
      //     headers: {
      //       'Authorization': `Bearer ${jwt}`,
      //     },
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => console.error('데이터 요청 에러:', error));
      // }

      logout() {
        // 로컬 저장소에서 JWT 삭제
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        // 로그아웃 처리를 위해 서버에 요청을 보냄
        fetch('http://localhost:4000/auth/signout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then(() => {
          console.log('로그아웃 되었습니다.');
        })
        .catch(error => console.error('로그아웃 에러:', error));
      }
      changepass(email,password){
         fetch('http://localhost:4000/auth/changepass', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email,password}),
         })
         .then(()=>{
          console.log('비밀번호가 변경되었습니다.');
         })
         .catch(error => console.error("잘못된요청: ",error));
      }     
}

export default AuthService;
