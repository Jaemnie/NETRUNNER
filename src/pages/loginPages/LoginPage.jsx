import React, { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Modal from './modals/Modal';
import AuthService from '../../services/AuthService';

function LoginPage() {
    let navigate = useNavigate();
    // 이벤트 핸들러는 useNavigate 훅으로부터 받은 navigate 함수를 사용

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    };
    const closeModal = () => { setIsModalOpen(false) };

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const openModal1 = () => {
        setIsModalOpen1(true)
    };
    const closeModal1 = () => { setIsModalOpen1(false) };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId,setID] = useState('');
    const [username, setUsername] = useState('');

    const [verificationCode, setVerificationCode] = useState('');
    const [inputVerificationCode, setInputVerificationCode] = useState('');
    const [checkVerification,setCheckVerification] = useState(false);
    const fakeVerificationCode = "1234";

    const authService = new AuthService();

    const [IdCheck,setIdCheck] = useState(false);

    const handelUsernameChange=(e)=>{
        setUsername(e.target.value);
    }
    const handleIdChange=(e)=>{
        setID(e.target.value);
    }

    const handelIdCheck = ()=>{
        setIdCheck(true);
    }

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleVerificationCodeChange = (e) => {
      setInputVerificationCode(e.target.value);
    };
  
    const handleSendVerificationCode = () => {
      // 인증번호를 이메일로 발송하는 로직 구현
      // 여기서는 예시로 랜덤 문자열을 생성하여 사용합니다.
 // 실제 애플리케이션에서는 서버에서 생성 및 전송
      setVerificationCode(fakeVerificationCode);
      alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
    };

    const handleVerificationCheck = () =>{
        // 인증 번호 입력란이 비어있는지,인증 번호 일치 검사
        if (inputVerificationCode.trim() && fakeVerificationCode === inputVerificationCode) {
            setCheckVerification(true);
            alert("인증되었습니다.");
        }else{
            setCheckVerification(false);
            alert("인증번호가 일치하지 않습니다.");
        }

    }
    

    const AccountSubmit = async(e) => {
      e.preventDefault();
      
    //   if(!checkVerification){
    //     alert("인증번호가 일치하지 않습니다.");
    //     return;
    //   }
      // 이메일 형식 검사
      if (!emailRegex.test(email)) {
        alert("유효한 이메일 주소를 입력해주세요.");
        return;
      }
      // 비밀번호 형식 검사
      if (!passwordRegex.test(password)) {
        alert("비밀번호는 최소 8자리 이상이며, 최소 하나의 숫자와 하나의 대문자를 포함해야 합니다.");
        return;
      }
      // 비밀번호 일치 검사
      if (password !== confirmPassword) {
        alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
        return;
      }

      authService.signup(userId,username,password,email); 
      console.log("회원가입 성공");
    };
  
    const FindPassSubmit = async(e) => {
        e.preventDefault();
        if(!checkVerification){
          alert("인증번호가 일치하지 않습니다.");
          return;
        }
        // 이메일 형식 검사
        if (!emailRegex.test(email)) {
          alert("유효한 이메일 주소를 입력해주세요.");
          return;
        }
        // 비밀번호 형식 검사
        if (!passwordRegex.test(password)) {
          alert("비밀번호는 최소 8자리 이상이며, 최소 하나의 숫자와 하나의 대문자를 포함해야 합니다.");
          return;
        }
        // 비밀번호 일치 검사
        if (password !== confirmPassword) {
          alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
          return;
        }
        
        console.log("성공");
        authService.changepass(email,password);
      };

      const submitHandler = (event) => {
        event.preventDefault();
        authService.login(userId,password);
            navigate('/loading');
        
    };


    return (
        <div>
            <div className={styles.ring}>
                <i style={{ '--clr': '#00ff0a' }}></i>
                <i style={{ '--clr': '#ff0057' }}></i>
                <i style={{ '--clr': '#fffd44' }}></i>
                <div className={styles.login}>
                    <h2>N E T R U N N E R</h2>
                    <form onSubmit={submitHandler}>
                        <div className={styles.inputBx}>
                            <input type="text" value={userId} onChange={handleIdChange} placeholder="아이디" required />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="password" value={password} onChange={handlePasswordChange}placeholder="비밀번호" required />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="submit" value="로그인" />
                        </div>
                    </form>
                    <div className={styles.links}>
                        <a href="#" onClick={(e) => { e.preventDefault(); openModal(); }} >비밀번호 찾기</a>
                        <Modal isOpen={isModalOpen} closeModal={closeModal}>
                            {
                                    <div className="modalContent">
                                    <span className="close" onClick={closeModal} >&times;</span>
                                        <h2>비밀번호 찾기</h2>
                                        <form onSubmit={FindPassSubmit} >
                                            <div className="inputBx">
                                                <input type="email" value={email} onChange={handleEmailChange} placeholder="이메일" required />
                                                <input type="button" value="인증" onClick={handleSendVerificationCode}  />
                                            </div>
                                            <div className="inputBx">
                                            <input type="text" value={inputVerificationCode} onChange={handleVerificationCodeChange}  placeholder="인증번호" required />
                                            <input type="button" value="인증번호 확인" onClick={handleVerificationCheck} />
                                        </div>
                                            <div className="inputBx" id="newPasswordBox">
                                                <input type="password" value={password} onChange={handlePasswordChange} placeholder="새 비밀번호" required />
                                                <input type="password"value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="새 비밀번호 확인" required />
                                                <input type="submit" value="비밀번호 재설정" id="resetPasswordButton" />
                                            </div>
                                        </form>
                                    </div>
                                }
                        </Modal>
                        <a href="#" onClick={(e) => { e.preventDefault(); openModal1(); }}>회원가입</a>
                        <Modal isOpen={isModalOpen1} closeModal={closeModal1}>
                            {
                                <div className="modalContent">
                                    <span className="close" onClick={closeModal1}>&times;</span>
                                    <h2>회원가입</h2>
                                    <form onSubmit={AccountSubmit} >
                                        <div className="inputBx">
                                            <input type="text" value={username} onChange={handelUsernameChange} placeholder="이름" required />
                                        </div>
                                        <div className="inputBx">
                                            <input type="email" value={email} onChange={handleEmailChange} placeholder="이메일 주소" required />
                                            <input type="button" value="인증번호 받기" onClick={handleSendVerificationCode}/>
                                        </div>
                                        <div className="inputBx">
                                            <input type="text" value={inputVerificationCode} onChange={handleVerificationCodeChange}  placeholder="인증번호" required />
                                            <input type="button" value="인증번호 확인" onClick={handleVerificationCheck}/>
                                        </div>
                                        <div className="inputBx">
                                            <input type="text" value={userId} onChange={handleIdChange} placeholder="아이디" required />
                                            <input type="button" onClick={handelIdCheck} value="중복확인" />
                                        </div>
                                        <div className="inputBx">
                                            <input type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호" required />
                                        </div>
                                        <div className="inputBx">
                                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}placeholder="비밀번호 재입력" required />
                                        </div>
                                        <div className="inputBx">
                                            <input type="submit" value="회원가입" />
                                        </div>
                                    </form>
                                </div>
                            }
                        </Modal>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default LoginPage;