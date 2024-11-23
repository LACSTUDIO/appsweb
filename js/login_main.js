    // 登录表单提交事件
    document.getElementById('login').onsubmit = function(event) {
        event.preventDefault(); // 阻止表单的默认提交行为

        const username = document.getElementById('basic_passport').value.trim(); // 去除输入前后的空格
        const password = document.getElementById('basic_password').value;

        // 验证用户名和密码
        if (!username || !password) {
            alert('用户名和密码不能为空。');
            return;
        }

        try {
            validateCredentials(username, password);
            localStorage.setItem('username', username);
            updateLoginStatus(true, username); // 更新登录状态
            window.location.href = "index.html"; // 登录后跳转到主页面
        } catch (error) {
            alert('登录失败: ' + error.message); // 提示错误信息
        }
    };

    // 验证用户名和密码
    const validCredentials = {
        'lican': '1111'
    };

    function validateCredentials(username, password) {
        if (!validCredentials[username] || validCredentials[username] !== password) {
            throw new Error('用户名或密码错误，请重试。');
        }
    }

    function updateLoginStatus(isLoggedIn, username) {
        const loginStatusElement = document.createElement('div');
        loginStatusElement.innerText = isLoggedIn ? `欢迎, ${username}!` : '请登录。';
        document.body.appendChild(loginStatusElement); // 将登录状态显示在页面上
    }