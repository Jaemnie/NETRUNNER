import { API } from '../config';

class AuthService {
  // 회원가입 함수
  async signup(userId, username, password, email) {
    try {
      const response = await fetch(`${API.SIGNUP}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, password, email }),
      });

      if (!response.ok) {
        throw new Error(`회원가입 실패: ${response.statusText}`);
      }

      console.log('회원가입이 완료되었습니다.');
      return true;
    } catch (error) {
      console.error('회원가입 에러:', error);
      return false;
    }
  }

  // 로그인 함수
  async login(userId, password) {
    try {
      const response = await fetch(`${API.SIGNIN}`, {
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
        localStorage.setItem('missionId', data.missionId);
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

  // 로그아웃 함수
  async logout() {
    // 로컬 저장소에서 JWT 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId'); // userId 삭제
    window.location.href = '/';

    try {
      const response = await fetch(`${API.SIGNOUT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Cache-Control': 'no-store', // Cache-Control 헤더 추가
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

  // 비밀번호 변경 함수
  async changepass(email, password) {
    try {
      const response = await fetch(`${API.CHANGEPASS}`, {
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

  // 아이디 중복 확인 함수
  async checkId(userId) {
    console.log('checkId 함수 시작'); // 함수 시작 로그
    console.log(`체크할 아이디: ${userId}`); // 입력된 userId 로그

    try {
      const response = await fetch(`${API.IDCHECK}/${userId}`, { // userId를 쿼리 파라미터로 포함
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('fetch 요청 완료'); // fetch 요청 완료 로그

      if (!response.ok) {
        throw new Error(`아이디 중복 확인 실패: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('응답 데이터:', data); // 응답 데이터 로그

      return data; // 응답 데이터가 true/false일 것으로 가정
    } catch (error) {
      console.error('아이디 중복 확인 에러:', error);
      return false;
    } finally {
      console.log('checkId 함수 종료'); // 함수 종료 로그
    }
  }
}

export default AuthService;
