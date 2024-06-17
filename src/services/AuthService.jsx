class AuthService {

  signup(userId, username, password, email) {
    fetch('http://172.16.230.134:4000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, username, password, email }),
    })
    .then(() => {
      console.log('회원가입이 완료되었습니다.');
    })
    .catch(error => console.error("회원가입 에러:", error));
  }

  login(userId, password) {
    return fetch('http://172.16.230.134:4000/auth/signin', {
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
        return true; // 로그인 성공
      } else {
        console.error('JWT를 받아오지 못했습니다.');
        return false; // 로그인 실패
      }
    })
    .catch(error => {
      console.error('로그인 에러:', error);
      return false; // 로그인 실패
    });
  }

  logout() {
    // 로컬 저장소에서 JWT 삭제
    localStorage.removeItem('accessToken');
    window.location.href = '/';
    // 로그아웃 처리를 위해 서버에 요청을 보냄
    fetch('http://172.16.230.134:4000/auth/signout', {
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

  changepass(email, password) {
    fetch('http://172.16.230.134:4000/auth/changepass', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then(() => {
      console.log('비밀번호가 변경되었습니다.');
    })
    .catch(error => console.error("잘못된 요청:", error));
  }
}

export default AuthService;
