import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Modal from './modals/Modal';
import AuthService from '../../services/AuthService';
import { API } from "../../config";

function LoginPage() {
    let navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const openModal1 = () => {
        setIsModalOpen1(true);
    };
    const closeModal1 = () => {
        setIsModalOpen1(false);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setID] = useState('');
    const [username, setUsername] = useState('');

    const [inputVerificationCode, setInputVerificationCode] = useState('');
    const [checkVerification, setCheckVerification] = useState(false);

    const authService = new AuthService();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleIdChange = (e) => {
        setID(e.target.value);
    };

    const handleIdCheck = () => {
        // ID 중복 확인 로직 구현
    };

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

    const handleSendVerificationCode = async () => {
        await fetch(`${API.EMAILSEND}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
    };

    const handleVerificationCheck = async () => {
        const code = inputVerificationCode;
        console.log("Sending verification check request", { inputVerificationCode, email });
        const response = await fetch(`${API.EMAILCHECK}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, email }),
        });
        const data = await response.json();
        console.log("Verification check response", data);
        if (data) {
            setCheckVerification(true);
            alert("인증되었습니다.");
        } else {
            setCheckVerification(false);
            alert("인증번호가 일치하지 않습니다.");
        }
    };

    const AccountSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("비밀번호는 최소 8자리 이상이며, 최소 하나의 숫자와 하나의 대문자를 포함해야 합니다.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
            return;
        }

        const result = await authService.signup(userId, username, password, email);
        if (result) {
            // 회원가입 성공 시 모달 닫기 및 상태 초기화
            closeModal1();
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setID('');
            setUsername('');
            setInputVerificationCode('');
            setCheckVerification(false);
            console.log("회원가입 성공");
        }
    };

    const FindPassSubmit = async (e) => {
        e.preventDefault();
        if (!checkVerification) {
            alert("인증번호가 일치하지 않습니다.");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("비밀번호는 최소 8자리 이상이며, 최소 하나의 숫자와 하나의 대문자를 포함해야 합니다.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호와 비밀번호 재입력이 일치하지 않습니다.");
            return;
        }

        console.log("성공");
        authService.changepass(email, password);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const isLoginSuccessful = await authService.login(userId, password);
        if (isLoginSuccessful) {
            navigate('/main');
        } else {
            alert("로그인에 실패했습니다.");
        }
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
                            <input type="text" value={userId} onChange={handleIdChange} placeholder="아이디" required aria-label="아이디 입력란" />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호" required aria-label="비밀번호 입력란" />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="submit" value="로그인" aria-label="로그인 버튼" />
                        </div>
                    </form>
                    <div className={styles.links}>
                        <button onClick={(e) => { e.preventDefault(); openModal(); }} aria-label="비밀번호 찾기">비밀번호 찾기</button>
                        <Modal isOpen={isModalOpen} closeModal={closeModal}>
                            <div className="modalContent">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>비밀번호 찾기</h2>
                                <form onSubmit={FindPassSubmit}>
                                    <div className="inputBx">
                                        <input type="email" value={email} onChange={handleEmailChange} placeholder="이메일" required aria-label="이메일 입력란" />
                                        <input type="button" value="인증" onClick={handleSendVerificationCode} aria-label="인증번호 발송 버튼" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="text" value={inputVerificationCode} onChange={handleVerificationCodeChange} placeholder="인증번호" required aria-label="인증번호 입력란" />
                                        <input type="button" value="인증번호 확인" onClick={handleVerificationCheck} aria-label="인증번호 확인 버튼" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="password" value={password} onChange={handlePasswordChange} placeholder="새 비밀번호" required aria-label="새 비밀번호 입력란" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="새 비밀번호 확인" required aria-label="새 비밀번호 확인 입력란" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="submit" value="비밀번호 재설정" id="resetPasswordButton" aria-label="비밀번호 재설정 버튼" />
                                    </div>
                                </form>
                            </div>
                        </Modal>
                        <button onClick={(e) => { e.preventDefault(); openModal1(); }} aria-label="회원가입">회원가입</button>
                        <Modal isOpen={isModalOpen1} closeModal={closeModal1}>
                            <div className="modalContent">
                                <span className="close" onClick={closeModal1}>&times;</span>
                                <h2>회원가입</h2>
                                <form onSubmit={AccountSubmit}>
                                    <div className="inputBx">
                                        <input type="text" value={username} onChange={handleUsernameChange} placeholder="이름" required aria-label="이름 입력란" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="email" value={email} onChange={handleEmailChange} placeholder="이메일 주소" required aria-label="이메일 입력란" />
                                        <input type="button" value="인증번호 받기" onClick={handleSendVerificationCode} aria-label="인증번호 받기 버튼" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="text" value={inputVerificationCode} onChange={handleVerificationCodeChange} placeholder="인증번호" required aria-label="인증번호 입력란" />
                                        <input type="button" value="인증번호 확인" onClick={handleVerificationCheck} aria-label="인증번호 확인 버튼" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="text" value={userId} onChange={handleIdChange} placeholder="아이디" required aria-label="아이디 입력란" />
                                        <input type="button" onClick={handleIdCheck} value="중복확인" aria-label="아이디 중복 확인 버튼" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호" required aria-label="비밀번호 입력란" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="비밀번호 재입력" required aria-label="비밀번호 재입력 입력란" />
                                    </div>
                                    <div className="inputBx">
                                        <input type="submit" value="회원가입" aria-label="회원가입 버튼" />
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
