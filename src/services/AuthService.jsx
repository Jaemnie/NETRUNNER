class AuthService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://netrunner.life:4000';
  }

  async signup(userId, username, password, email) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, password, email }),
      });

      if (!response.ok) {
        throw new Error(`회원가입 실패: ${response.statusText}`);
      }

      console.log('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 에러:', error);
    }
  }

  async login(userId, password) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        throw new Error(`로그인 실패: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userId', userId); // userId 저장
        return true; // 로그인 성공
      } else {
        console.error('JWT를 받아오지 못했습니다.');
        return false; // 로그인 실패
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      return false; // 로그인 실패
    }
  }

  async logout() {
    // 로컬 저장소에서 JWT 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId'); // userId 삭제
    window.location.href = '/';

    try {
      const response = await fetch(`${this.baseUrl}/auth/signout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`로그아웃 실패: ${response.statusText}`);
      }

      console.log('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  }

  async changepass(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/changepass`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`비밀번호 변경 실패: ${response.statusText}`);
      }

      console.log('비밀번호가 변경되었습니다.');
    } catch (error) {
      console.error('비밀번호 변경 에러:', error);
    }
  }
}

export default AuthService;
