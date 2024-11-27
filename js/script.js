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
    const queryInput = document.getElementById('searchQuery');
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



