// 获取相关的 DOM 元素
const loginStatusElements = {
    desktop: document.getElementById('login-status'),
    mobile: document.getElementById('login-status-phone')
};
const loginButtonElements = {
    desktop: document.getElementById('login-button'),
    mobile: document.getElementById('login-button-phone')
};
const userInfoElements = {
    desktop: document.getElementById('user-info'),
    mobile: document.getElementById('user-info-phone')
};
const avatarElements = {
    desktop: document.getElementById('avatar'),
    mobile: document.getElementById('avatar-phone')
};
const dropdownMenuContentElements = {
    desktop: document.getElementById('user-dropdown-menu-content'),
    mobile: document.getElementById('user-dropdown-menu-content-phone')
};

// 更新登录状态 UI
function updateLoginStatus(isLoggedIn, username = '', avatarUrl = 'img/icon/mr.svg') {
    for (let [key, element] of Object.entries(loginStatusElements)) {
        if (element) {
            element.textContent = isLoggedIn ? `${username} 已登录` : ''; // 显示用户名
        } else {
            console.error(`更新登录状态时找不到 login-status-${key} 元素`);
        }
    }

    for (let [key, element] of Object.entries(loginButtonElements)) {
        if (element) {
            element.style.display = isLoggedIn ? 'none' : 'inline'; // 显示或隐藏登录按钮
        } else {
            console.error(`更新登录状态时找不到 login-button-${key} 元素`);
        }
    }

    for (let [key, element] of Object.entries(userInfoElements)) {
        if (element) {
            element.style.display = isLoggedIn ? 'inline' : 'none'; // 显示或隐藏用户信息
        } else {
            console.error(`更新登录状态时找不到 user-info-${key} 元素`);
        }
    }

    for (let [key, element] of Object.entries(avatarElements)) {
        if (element) {
            element.src = isLoggedIn ? avatarUrl : 'img/icon/mr.svg'; // 设置头像 URL
        } else {
            console.error(`更新登录状态时找不到 avatar-${key} 元素`);
        }
    }

    for (let [key, element] of Object.entries(dropdownMenuContentElements)) {
        if (element) {
            element.style.display = 'none'; // 确保下拉菜单初始状态是隐藏的
        } else {
            console.error(`更新登录状态时找不到 user-dropdown-menu-content-${key} 元素`);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username') || '';
    const avatarUrl = localStorage.getItem('avatarUrl') || 'img/icon/mr.svg';
    console.log('Username from localStorage:', username);
    console.log('AvatarUrl from localStorage:', avatarUrl);
    updateLoginStatus(!!username, username, avatarUrl);

    // 登录按钮点击事件，未登录时跳转到登录页面
    for (let [key, button] of Object.entries(loginButtonElements)) {
        if (button) {
            button.addEventListener('click', function () {
                const isLoggedIn = !!localStorage.getItem('username');
                console.log('Is logged in:', isLoggedIn);
                if (isLoggedIn) {
                    toggleDropdownMenu(key); // 已登录，显示下拉菜单
                } else {
                    location.href = 'login.html'; // 未登录时跳转到 login.html 页面
                }
            });
        } else {
            console.error(`登录按钮 login-button-${key} 未找到`);
        }
    }

    // 假设有一个登出按钮，点击事件触发登出操作
    const logoutButtonElements = {
        desktop: document.getElementById('logout-button'),
        mobile: document.getElementById('logout-button-phone')
    };
    for (let [key, button] of Object.entries(logoutButtonElements)) {
        if (button) {
            button.addEventListener('click', function () {
                logout();
            });
        } else {
            console.error(`登出按钮 logout-button-${key} 未找到`);
        }
    }
});


// 显示/隐藏下拉菜单
function toggleDropdownMenu(device) {
    const dropdown = userInfoElements[device];
    if (dropdown) {
        dropdown.classList.toggle('show'); // 使用 Bootstrap 的 show 类来控制显示
        console.log(`Dropdown menu on ${device} toggled to:`, dropdown.classList.contains('show') ? 'block' : 'none');
    } else {
        console.error(`用户信息元素 user-info-${device} 未找到`);
        return; // 如果未找到用户信息元素，直接返回，避免不必要的操作
    }
}

// 隐藏下拉菜单（点击页面其他地方时）
document.addEventListener('click', function (event) {
    try {
        for (let [key, dropdownMenu] of Object.entries(dropdownMenuContentElements)) {
            if (dropdownMenu && userInfoElements[key]) {
                if (!dropdownMenu.contains(event.target) && !userInfoElements[key].contains(event.target)) {
                    dropdownMenu.style.display = 'none'; // 点击其他地方时隐藏菜单
                    console.log(`Dropdown menu on ${key} hidden by click outside`);
                }
            } else {
                console.error(`下拉菜单元素 user-dropdown-menu-content-${key} 或用户信息元素 user-info-${key} 未找到`);
            }
        }
    } catch (error) {
        console.error('隐藏下拉菜单时发生错误:', error);
    }
});


// 用户登出
function logout() {
    console.log('Removing username:', localStorage.getItem('username'));
    console.log('Removing avatarUrl:', localStorage.getItem('avatarUrl'));
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    console.log('Username after removal:', localStorage.getItem('username'));
    console.log('AvatarUrl after removal:', localStorage.getItem('avatarUrl'));

    updateLoginStatus(false); // 更新 UI 为未登录状态
    console.log('Updated login status to false');

    showStatusModal('已退出登录,再见!'); // 显示状态消息弹窗

}

// 显示状态消息弹窗（假设该函数已经定义）
function showStatusModal(message) {
    console.log('Showing status modal with message:', message);
    // 这里可以添加显示弹窗的实际代码
}
