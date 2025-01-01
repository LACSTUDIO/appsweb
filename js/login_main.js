// login_main.js

document.addEventListener('DOMContentLoaded', function() {
    // 切换到注册表单
    function showRegister() {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'block';
    }

    // 切换到登录表单
    function showLogin() {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    }

    // 显示状态信息弹窗
    function showStatusMessage(message) {
        try {
            document.getElementById('status-message').textContent = message;
            document.getElementById('status-modal').style.display = 'block';
            setTimeout(function() {
                document.getElementById('status-modal').style.display = 'none';
            }, 2000); // 2秒后自动隐藏
        } catch (error) {
            console.error('显示状态信息时出错:', error);
            showStatusMessage('显示状态信息时发生错误');
        }
    }

    // 验证用户凭证（假设这是个验证函数）
    function validateCredentials(username, password) {
        // 这里可以添加实际的凭证验证逻辑
        return username === '管理员' && password === '1111';
    }

    // 更新登录状态
    function updateLoginStatus(isLoggedIn, username) {
        // 这里可以添加实际的更新登录状态的逻辑
        console.log(isLoggedIn ? `${username} 已登录` : '已登出');
    }

    // 登录表单验证
    document.getElementById('login-form').addEventListener('submit', function(event) {
        try {
            event.preventDefault(); // 阻止表单默认提交行为
            const username = document.getElementById('user').value.trim();
            const password = document.getElementById('pwd').value.trim();

            if (!username) {
                showStatusMessage('请输入用户名');
                return;
            }

            if (!password) {
                showStatusMessage('请输入密码');
                return;
            }

            if (validateCredentials(username, password)) {
                localStorage.setItem('username', username);
                updateLoginStatus(true, username); // 更新登录状态
                showStatusMessage(`用户  ${username} 欢迎你！`);
                setTimeout(function() {
                    window.location.href = "index.html"; // 登录后跳转到主页面
                }, 2000); // 2秒后跳转页面
            } else {
                showStatusMessage('用户名或密码错误');
            }
        } catch (error) {
            console.error('登录表单验证时出错:', error);
            showStatusMessage('发生错误，请重试');
        }
    });

    // 注册表单验证
    document.getElementById('register-form').addEventListener('submit', function(event) {
        try {
            event.preventDefault(); // 阻止表单默认提交行为
            const username = document.getElementById('user-register').value.trim();
            const password = document.getElementById('pwd-register').value.trim();
            const confirmPassword = document.getElementById('pwd-confirm').value.trim();

            if (!username) {
                showStatusMessage('请输入用户名');
                return;
            }

            if (!password) {
                showStatusMessage('请输入密码');
                return;
            }

            if (password.length < 4) {
                showStatusMessage('密码至少需要4位');
                return;
            }

            if (!confirmPassword) {
                showStatusMessage('请确认密码');
                return;
            }

            if (password !== confirmPassword) {
                showStatusMessage('两次输入的密码不一致');
                return;
            }

            // 这里可以添加实际的注册逻辑，比如发送请求到服务器
            // 示例：发送注册请求
            // fetch('/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ username, password })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         showStatusMessage('注册成功');
            //         // 重定向或其他操作
            //     } else {
            //         showStatusMessage('注册失败: ' + data.message);
            //     }
            // })
            // .catch(error => {
            //     showStatusMessage('请求错误: ' + error);
            // });

            showStatusMessage('注册成功（模拟）');
            showLogin();
        } catch (error) {
            console.error('注册表单验证时出错:', error);
            showStatusMessage('发生错误，请重试');
        }
    });

    // 将函数绑定到按钮
    document.getElementById('show-register').addEventListener('click', showRegister);
    document.getElementById('show-login').addEventListener('click', showLogin);
});

