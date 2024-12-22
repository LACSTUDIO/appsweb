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
    autoSlideInterval = setInterval(() => moveCarousel(1), 3000); // 每3秒切换一次
}

// 重置自动轮播
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// 页面加载时启动自动轮播
window.onload = startAutoSlide;

// 搜索软件
async function searchSoftware() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) return; // 如果搜索词为空则返回

    try {
        const response = await fetch(`/search?query=${encodeURIComponent(searchTerm)}`);

        if (!response.ok) throw new Error('网络错误');

        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('错误:', error);
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
    if (theme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }
});

// 处理图片加载错误
function handleImageError(image) {
    if (image) {
        image.style.display = 'none';
        console.error("图片加载失败:", image.src); // 添加错误日志
    }
}

// 弹窗显示二维码
function openQRCode() {
    toggleModal('qrModal', true);
}

// 关闭二维码弹窗
function closeQRCode() {
    toggleModal('qrModal', false);
}

// 显示免责声明
function showDisclaimer() {
    document.getElementById('disclaimer-modal').style.display = 'flex';
}

// 关闭免责声明
function closeDisclaimer() {
    document.getElementById('disclaimer-modal').style.display = 'none';
}

function searchSoftware() {
    var input = document.getElementById('searchInput').value;
    if (input.trim() === '') {
        alert('请输入内容');
    } else {
        // 此处可以添加搜索的逻辑
        console.log('搜索内容为: ' + input);
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        searchSoftware();
    }
}

//二维码弹窗
function openQRCode(type) {
    let qrCodeUrl;
    switch (type) {
        case 'bilibili':
            qrCodeUrl = 'path/to/bilibili_qr.png';
            break;
        case 'coolapk':
            qrCodeUrl = 'path/to/coolapk_qr.png';
            break;
        case 'xiaomi':
            qrCodeUrl = 'path/to/xiaomi_qr.png';
            break;
        case 'email':
            qrCodeUrl = 'path/to/email_qr.png';
            break;
        case 'wechat':
            qrCodeUrl = 'img/qr/wechat.png';
            break;
        case 'public_account':
            qrCodeUrl = 'img/qr/公众号.png';
            break;
    }

    // 显示模态框
    document.getElementById('qrCodeImage').src = qrCodeUrl;
    document.getElementById('qrModal').style.display = "block";
}

function closeQRCode() {
    document.getElementById('qrModal').style.display = "none";
}

// 点击模态框区域关闭模态框
window.onclick = function (event) {
    if (event.target == document.getElementById('qrModal')) {
        closeQRCode();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // 初始化主题，加载当前主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme === 'dark' ? 'bg-dark' : 'bg-light');
    toggleNavbarTheme(savedTheme); // 初始化navbar样式

    // 添加主题切换按钮的点击事件
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; 
        toggleTheme(newTheme);
    });
});

// 切换主题
function toggleTheme(theme) {
    const body = document.body;
    const message = document.createElement('div');
    message.className = 'message';

    body.classList.toggle('bg-dark', theme === 'dark');
    body.classList.toggle('bg-light', theme === 'light');
    
    toggleNavbarTheme(theme); // 切换navbar样式

    document.querySelectorAll('.title').forEach(title => {
        title.classList.toggle('dark', theme === 'dark');
    });

    document.querySelectorAll('.container-litte, .container').forEach(container => {
        container.classList.toggle('dark', theme === 'dark');
    });

    // 设置下拉框中的选项文本
    document.querySelectorAll('select').forEach(select => {
        select.options[0].text = theme === 'dark' ? '深色' : '浅色';
    });

    message.innerText = theme === 'dark' ? '已进入深色主题' : '已进入浅色主题';
    body.appendChild(message);
    setTimeout(() => body.removeChild(message), 1000);

    localStorage.setItem('theme', theme);
}

// 切换navbar的主题样式
function toggleNavbarTheme(theme) {
    const navbar = document.querySelector('.navbar'); // 获取navbar元素
    if (navbar) {
        navbar.classList.toggle('navbar-dark', theme === 'dark');
        navbar.classList.toggle('navbar-light', theme === 'light');
    }
}

function performSearch() {
    const queryInput = document.getElementById('search');
    const query = queryInput.value.trim();

    // 检查输入是否为空
    if (!query) {
        alert("请输入搜索内容"); 
        return false;
    }

    const searchUrl = `https://cn.bing.com/search?q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
    return false;
}


function updateDisplayMode() {
    const displayMode = document.getElementById('displayMode');
    if (window.innerWidth > 768) { // 假设768px为大屏幕的界限
        displayMode.innerText = '网站显示模式: 电脑模式';
    } else {
        displayMode.innerText = '网站显示模式: 手机模式';
    }
}

// 页面加载时和窗口大小调整时更新显示模式
window.onload = updateDisplayMode;
window.onresize = updateDisplayMode;


    // 获取操作系统信息的函数
function getOSInfo() {
    let userAgent = window.navigator.userAgent;
    let os = "未知操作系统";

    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    else if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (userAgent.indexOf("Android") !== -1) os = "Android";
    else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) os = "iOS";
    else if (userAgent.indexOf("iPod") !== -1) os = "iPod";
    else if (userAgent.indexOf("BlackBerry") !== -1) os = "BlackBerry";
    else if (userAgent.indexOf("Opera Mini") !== -1) os = "Opera Mini";
    else if (userAgent.indexOf("IEMobile") !== -1) os = "IEMobile";
    else if (userAgent.indexOf("WPDesktop") !== -1) os = "Windows Phone";
    else if (userAgent.indexOf("Chrome") !== -1) os = "Chrome OS";
    else if (userAgent.indexOf("Firefox") !== -1) os = "Firefox";
    else if (userAgent.indexOf("Safari") !== -1) os = "Safari";
    else if (userAgent.indexOf("UCBrowser") !== -1) os = "UC Browser";
    else if (userAgent.indexOf("QQBrowser") !== -1) os = "QQ Browser";
    else if (userAgent.indexOf("Baidu") !== -1) os = "Baidu Browser";
    else if (userAgent.indexOf("Chrome") !== -1) os = "Chrome OS";
    else if (userAgent.indexOf("Safari") !== -1) os = "Safari";
    else if (userAgent.indexOf("Opera") !== -1) os = "Opera";


    return os;
}

// 更新操作系统信息到页面
document.addEventListener("DOMContentLoaded", function() {
    const osVersionElement = document.getElementById("os_version");
    osVersionElement.innerHTML = "操作系统: " + getOSInfo();
});


const startTime = new Date('2024-11-22T00:00:00'); // 请根据实际情况修改
function updateTime() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // 计算已运行的秒数

    // 显示格式化转换
    const days = Math.floor(elapsedTime / (24 * 60 * 60));
    const hours = Math.floor((elapsedTime % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    // 更新页面元素
    document.getElementById('time').innerText = `网站运行时间: ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
}

// 每秒更新一次
setInterval(updateTime, 1000);


const owner = 'LACSTUDIO'; // 替换为仓库所有者的用户名
const repo = 'appsweb'; // 替换为你的仓库名


fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
    .then(response => {
        console.log('响应状态:', response.status);
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return response.json();
    })
    .then(commits => {
        console.log('提交数据:', commits); // 打印提交数据以进行调试
        if (commits.length > 0) {
            const lastCommitDate = commits[0].commit.committer.date;
            console.log("最后一次提交时间: " + new Date(lastCommitDate).toLocaleString());
        } else {
            console.log("没有可用的提交记录");
        }
    })
    .catch(error => {
        console.error('获取提交数据失败: ', error);
    });


// 假设你有一个获取用户IP地址的函数
// 假设你有一个获取用户IP地址的函数
function getUserIP() {
    return fetch('https://api.ipify.org?format=json') // 调用获取IP地址的API
        .then(response => {
            if (!response.ok) {
                throw new Error('网络错误'); // 如果响应不成功，抛出错误
            }
            return response.json(); // 解析为JSON格式
        })
        .then(data => data.ip) // 返回IP地址
        .catch(error => {
            console.error('获取IP地址失败: ', error); // 处理错误
            return "无法获取IP地址"; // 返回一个默认值或错误信息
        });
}



// 判断某个条件来显示IP地址
function displayIP() {
    let condition = true; // 这里可以更改为任何逻辑条件
    if (condition) {
        let ipAddress = getUserIP();
        document.getElementById("ip").textContent = "你的IP地址: " + ipAddress;
    } else {
        document.getElementById("ip").textContent = "无法获取IP地址";
    }
}

// 页面加载时执行显示IP地址的函数
window.onload = displayIP;




