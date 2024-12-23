let currentIndex = 0;
let autoSlideInterval;

// 点击左右箭头切换图片
function moveCarousel(direction) {
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    if (totalImages === 0) return; // 如果没有图片则返回

    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    updateCarousel();
    resetAutoSlide();
}

// 更新轮播图显示
function updateCarousel() {
    const carouselImages = document.getElementById('carouselImages');
    if (carouselImages) {
        carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
    } else {
        console.error('未找到轮播图元素'); // 增加错误处理
    }
}

// 开始自动轮播
function startAutoSlide() {
    clearInterval(autoSlideInterval); // 清除上一个定时器
    autoSlideInterval = setInterval(() => moveCarousel(1), 3000); // 每3秒切换一次
}

// 页面加载时启动自动轮播
window.onload = startAutoSlide;

// 搜索软件
async function searchSoftware() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) {
        alert("请输入搜索内容");
        return; // 如果搜索词为空则返回
    }

    try {
        const response = await fetch(`/search?query=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('网络错误');

        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('错误:', error);
        alert('搜索出现问题，请稍后再试。'); // 提示用户
    }
}

// 显示搜索结果
function displaySearchResults(results) {
    const container = document.querySelector('.container');
    container.innerHTML = '<h2>搜索结果</h2>'; // 清空当前内容

    results.forEach(software => {
        const card = document.createElement('div');
        card.className = 'software-card';
        card.innerHTML = `
            <h3>${software.name}</h3>
            <p>${software.description}</p>
            <a href="${software.downloadUrl}">下载</a>
        `;
        container.appendChild(card);
    });
}

// 页面加载时应用用户的选择
document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark-mode');
    }
});

// 处理图片加载错误
function handleImageError(image) {
    if (image) {
        image.style.display = 'none';
        console.error("图片加载失败:", image.src); // 添加错误日志
    }
}

// 显示/关闭免责声明
function toggleDisclaimer(show) {
    document.getElementById('disclaimer-modal').style.display = show ? 'flex' : 'none';
}

// 获取弹窗元素和按钮
const modal = document.getElementById("settings-modal");
const settingButton = document.getElementById("setting-button");
const closeButton = document.getElementById("close_btn");

// 打开和关闭弹窗
settingButton.onclick = () => modal.style.display = "block";
closeButton.onclick = () => modal.style.display = "none";

// 点击弹窗外关闭弹窗
window.onclick = event => {
    if (event.target === modal || event.target === document.getElementById('qrModal')) {
        modal.style.display = "none";
        closeQRCode();
    }
}

// 二维码弹窗
function openQRCode(type) {
    const qrCodeUrlMap = {
        'bilibili': 'path/to/bilibili_qr.png',
        'coolapk': 'path/to/coolapk_qr.png',
        'xiaomi': 'path/to/xiaomi_qr.png',
        'email': 'path/to/email_qr.png',
        'wechat': 'img/qr/wechat.png',
        'public_account': 'img/qr/公众号.png'
    };

    const qrCodeUrl = qrCodeUrlMap[type];
    if (qrCodeUrl) {
        document.getElementById('qrCodeImage').src = qrCodeUrl;
        document.getElementById('qrModal').style.display = "block";
    } else {
        console.error('未找到相应的二维码类型');
    }
}

function closeQRCode() {
    document.getElementById('qrModal').style.display = "none";
}

// 切换主题
// 设置主题功能
function toggleTheme(theme) {
    const body = document.body;
    body.classList.toggle('bg-dark', theme === 'dark');
    body.classList.toggle('bg-light', theme === 'light');
    localStorage.setItem('theme', theme); // 存储当前主题到 localStorage

    // 设置下拉选择器的值
    const selectElement = document.getElementById('themeSelector');
    selectElement.value = theme; // 根据选择的主题更新下拉菜单
}

// 页面加载时设置主题
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // 默认主题为浅色
    toggleTheme(savedTheme); // 设置初始主题
});



// 初始化主题和事件
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    toggleTheme(savedTheme);
});

// 更新显示模式
function updateDisplayMode() {
    const displayMode = document.getElementById('displayMode');
    displayMode.innerText = window.innerWidth > 768 ? '网站显示模式: 电脑模式' : '网站显示模式: 手机模式';
}

// 页面加载时和窗口大小调整时更新显示模式
window.onresize = updateDisplayMode;
updateDisplayMode(); // 初始调用

// 获取操作系统信息的函数
function getOSInfo() {
    const userAgent = window.navigator.userAgent;
    const osMap = {
        "Win": "Windows",
        "Mac": "MacOS",
        "Linux": "Linux OR Android",
        "Android": "Android",
        "iPhone": "iOS",
        "iPad": "iOS",
        "iPod": "iPod",
        "BlackBerry": "BlackBerry",
        "Opera Mini": "Opera Mini",
        "IEMobile": "IEMobile",
        "WPDesktop": "Windows Phone",
        "Chrome": "Chrome OS",
        "Firefox": "Firefox",
        "Safari": "Safari",
        "UCBrowser": "UC Browser",
        "QQBrowser": "QQ Browser",
        "Baidu": "Baidu Browser",
    };

    return Object.keys(osMap).find(key => userAgent.includes(key)) ? osMap[key] : "未知操作系统";
}

// 更新操作系统信息到页面
document.addEventListener("DOMContentLoaded", () => {
    const osVersionElement = document.getElementById("os_version");
    osVersionElement.innerHTML = "操作系统: " + getOSInfo();
});

// 计算网站运行时间
const startTime = new Date('2024-11-22T00:00:00');
function updateTime() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const timeStr = new Date(elapsedTime * 1000).toISOString().substr(11, 8); // 格式化为 HH:mm:ss
    document.getElementById('time').innerText = `网站运行时间: ${timeStr}`;
}

// 每秒更新一次
setInterval(updateTime, 1000);

// 获取用户IP地址
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('网络错误');

        const data = await response.json();
        return data.ip; // 返回IP地址
    } catch (error) {
        console.error('获取IP地址失败: ', error);
        return "无法获取IP地址"; // 返回一个默认值或错误信息
    }
}

// 显示IP地址
async function displayIP() {
    const ipAddress = await getUserIP();
    document.getElementById("ip").textContent = "你的IP地址: " + ipAddress;
}

// 页面加载时执行显示IP地址的函数
window.onload = displayIP;
