// 모달을 띄우고 닫는 함수들을 정의
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 비밀번호 찾기 링크에 이벤트 리스너 추가
const passwordResetLink = document.querySelector('a[href="#passwordResetModal"]');
if (passwordResetLink) {
    passwordResetLink.addEventListener('click', (e) => {
        e.preventDefault(); // 링크의 기본 동작을 중지
        showModal('passwordResetModal');
    });
}

// 회원가입 링크에 이벤트 리스너 추가
const signupLink = document.querySelector('a[href="#signupModal"]');
if (signupLink) {
    signupLink.addEventListener('click', (e) => {
        e.preventDefault(); // 링크의 기본 동작을 중지
        showModal('signupModal');
    });
}

// 모든 모달의 닫기 버튼에 이벤트 리스너 추가
document.querySelectorAll('.modal .close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        // 버튼이 속한 모달의 ID를 찾아 닫기
        const modalId = closeButton.closest('.modal').id;
        closeModal(modalId);
    });
});

// 모달 외부 클릭 시 모달 닫기
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// 비밀번호 찾기
function validatePasswordResetForm(e) {
    e.preventDefault(); // 폼 기본 제출 동작 중지
    let newPassword = document.getElementsByName('newPassword')[0].value;
    let confirmNewPassword = document.getElementsByName('confirmNewPassword')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;
    if (email.match(email_regex)) {
        console.log(email);
    } else {
        alert('유효하지 않은 이메일 주소');
        return false;
    }

    //인증번호 검사체크

    if (checkPassword(newPassword)) {
        // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
        if (newPassword === confirmNewPassword) {
            alert('비밀번호가 재설정되었습니다.'); // 비밀번호 재설정 로직 구현
            // 폼 제출 또는 페이지 이동 로직 구현
            return true; // 폼 제출을 계속 진행
        } else {
            alert('입력한 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
            return false; // 폼 제출 중지
        }
    } else {
        alert('비밀번호는 8자리 이상, 하나이상의 대소문자,숫자,특수기호가 포함되어야합니다.');
        return false;
    }
}

document.getElementById('verifyEmailButton').addEventListener('click', function () {
    document.getElementById('verificationCodeBox').style.display = 'block';
});

document.getElementById('checkVerificationCodeButton').addEventListener('click', function () {
    document.getElementById('newPasswordBox').style.display = 'block';
});


function validateCreateAccountResetForm(e) {
    e.preventDefault(); // 폼 기본 제출 동작 중지
    let Password = document.getElementsByName('password')[1].value + "";
    let confirmPassword = document.getElementsByName('confirmPassword')[0].value + "";
    const email = document.getElementsByName('email')[1].value;
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;

    console.log(Password);

    if (email.match(email_regex)) {
        console.log(email);
    } else {
        alert('유효하지 않은 이메일 주소');
        return false;
    }
    if (checkPassword(Password)) {
        // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
        if (Password === confirmPassword) {
            return true; // 폼 제출을 계속 진행
        } else {
            alert('입력한 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
            return false; // 폼 제출 중지
        }
    } else {
        alert('비밀번호는 8자리 이상, 하나이상의 대소문자,숫자,특수기호가 포함되어야합니다.');
        return false;
    }

    //아이디중복여부 체크, 인증번호같은지 체크
}


// 회원가입
function requestEmailVerification() {
    const email = document.querySelector('#signupModal input[name="email"]').value;
    // 이메일 주소를 사용하여 서버에 인증번호 발송을 요청하는 로직을 구현
    console.log('휴대폰 인증번호 요청:', email);
    // 여기서는 콘솔에 출력만 하고 있습니다.
}


function checkPassword(password) {
    console.log(password);
    if (password.length < 8) {
        console.log(password.length);
        return false;
    }
    if (!(/[a-z]/gm.test(password))) {
        console.log((/[a-z]/gm.test(password)));
        return false;
    }
    if (!(/[A-Z]/gm.test(password))) {
        console.log(/[A-Z]/gm.test(password));
        return false;
    }
    if (!(/\d/gm.test(password))) {
        console.log(/\d/gm.test(password));
        return false;
    }
    if (!(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/gm.test(password))) {
        console.log(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/gm.test(password));
        return false;
    }
    return true;
}
