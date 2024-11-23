// login.js

const loginStatusElement = document.getElementById('login-status');
const loginButtonElement = document.getElementById('login-button');



function updateLoginStatus(isLoggedIn, username = '', avatarUrl = 'img/icon/mr.svg') {
    if (loginStatusElement && loginButtonElement) {
        loginStatusElement.textContent = isLoggedIn ? ` ${username} 已登录` : '账号未登录';
        loginButtonElement.textContent = isLoggedIn ? '账号管理' : '登录账号';
        const avatarElement = document.getElementById('avatar');
        if (avatarElement) {
            avatarElement.style.display = isLoggedIn ? 'inline' : 'none';
            avatarElement.src = isLoggedIn ? avatarUrl : 'img/icon/mr.svg'; // 设置头像URL
        } else {
            console.error("找不到头像元素");
        }
    } else {
        console.error("找不到更新登录状态所需的元素");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username') || '';
    const avatarUrl = localStorage.getItem('avatarUrl') || 'img/icon/mr.svg';
    updateLoginStatus(!!username, username, avatarUrl);

    loginButtonElement.addEventListener('click', function () {
        const isLoggedIn = !!localStorage.getItem('username');
        isLoggedIn ? showAccountModal() : (location.href = 'login.html');
    });
});

function showAccountModal() {
    const accountModal = document.getElementById('account-modal');
    if (accountModal) {
        accountModal.style.display = 'block';
    } else {
        console.error("找不到账号管理弹窗");
    }
}

function closeAccountModal() {
    const accountModal = document.getElementById('account-modal');
    if (accountModal) {
        accountModal.style.display = 'none';
    } else {
        console.error("找不到关闭账号管理弹窗的元素");
    }
}

function updateAccount() {
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const avatarInput = document.getElementById('avatarInput').files[0];

    if (!username || !password) {
        alert("用户名和密码不能为空！");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        localStorage.setItem('username', username);
        localStorage.setItem('avatarUrl', avatarInput ? e.target.result : 'img/icon/mr.svg');
        alert("账号信息已更新！");
        closeAccountModal();
        updateLoginStatus(true, username, avatarInput ? e.target.result : 'img/icon/mr.svg');
    };

    if (avatarInput) {
        reader.readAsDataURL(avatarInput);
    } else {
        reader.onload({ target: { result: 'img/icon/mr.svg' } });
    }
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    updateLoginStatus(false);
    closeAccountModal();
}

function updateFileName() {
    const fileInput = document.getElementById('avatarInput');
    const fileNameInput = document.getElementById('fileNameInput');

    if (fileInput.files.length > 0) {
        fileNameInput.value = fileInput.files[0].name; // 获取文件名并显示在文本框中
    } else {
        fileNameInput.value = ''; // 如果没选择文件，清空文本框
    }
}