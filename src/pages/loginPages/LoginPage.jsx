import React, { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Modal from './modals/Modal';

function LoginPage() {
    let navigate = useNavigate();
    // 이벤트 핸들러는 useNavigate 훅으로부터 받은 navigate 함수를 사용
    const submitHandler = (event) => {
        event.preventDefault();
        navigate('/loading');
    };

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


    const modalref = useRef();

    useEffect(()=>{
        const handler = (event) =>{
            if(modalref.current && !modalref.current.contains(event.target)){
                closeModal();
            }
        };
        document.addEventListener('mousedown',handler);
        return() =>{
            document.removeEventListener('mousedown',handler);
        };
    },[]);


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
                            <input type="text" name="username" placeholder="아이디" required />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="password" name="password" placeholder="비밀번호" required />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="submit" value="로그인" />
                        </div>
                    </form>
                    <div className={styles.links}>
                        <a href="#" onClick={(e) => { e.preventDefault(); openModal(); }} >비밀번호 찾기</a>
                        <Modal ref={modalref}  isOpen={isModalOpen} closeModal={closeModal}>
                            {
                                <div className="modal" id="passwordResetModal">
                                    <div className="modal_content">
                                    <span className="close" onClick={closeModal} >&times;</span>
                                        <h2>비밀번호 찾기</h2>
                                        <form id="passwordResetForm" >
                                            <div className="inputBx">
                                                <input type="email" name="email" placeholder="이메일" required />
                                                <input type="button" value="인증" id="verifyEmailButton"  />
                                            </div>
                                            <div className="inputBx" id="verificationCodeBox" >
                                                <input type="text" name="verificationCode" placeholder="인증번호" required />
                                                <input type="button" value="인증번호 확인" id="checkVerificationCodeButton" />
                                            </div>
                                            <div className="inputBx" id="newPasswordBox">
                                                <input type="password" name="newPassword" placeholder="새 비밀번호" required />
                                                <input type="password" name="confirmNewPassword" placeholder="새 비밀번호 확인" required />
                                                <input type="submit" value="비밀번호 재설정" id="resetPasswordButton" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                }
                        </Modal>
                        <a href="#" onClick={(e) => { e.preventDefault(); openModal1(); }}>회원가입</a>
                        <Modal isOpen={isModalOpen1} closeModal={closeModal1}>
                            {
                            <div className="modal" id="signupModal">
                                <div className="modal_content">
                                    <span className="close" onClick={closeModal1}>&times;</span>
                                    <h2>회원가입</h2>
                                    <form id="signupForm" >
                                        <div className="inputBx">
                                            <input type="text" name="name" placeholder="이름" required />
                                        </div>
                                        <div className="inputBx">
                                            <input type="email" name="email" placeholder="이메일 주소" required />
                                            <input type="button" value="인증번호 받기" />
                                        </div>
                                        <div className="inputBx">
                                            <input type="text" name="verificationCode" placeholder="인증번호" required />
                                            <input type="button" value="인증번호 확인" id="checkVerificationCodeButton" />
                                        </div>
                                        <div className="inputBx">
                                            <input type="text" name="username" placeholder="아이디" required />
                                            <input type="button" name="check" value="중복확인" />
                                        </div>
                                        <div className="inputBx">
                                            <input type="password" name="password" placeholder="비밀번호" required />
                                        </div>
                                        <div className="inputBx">
                                            <input type="password" name="confirmPassword" placeholder="비밀번호 재입력" required />
                                        </div>
                                        <div className="inputBx">
                                            <input type="submit" value="회원가입" />
                                        </div>
                                    </form>
                                </div>
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