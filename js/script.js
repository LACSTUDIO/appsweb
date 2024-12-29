let currentIndex = 0;
let autoSlideInterval;

// 点击箭头切换图片
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
            if (!response.ok) {
                throw new Error(`服务器响应错误: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            displaySearchResults(data);
        } catch (error) {
            console.error('搜索时发生错误:', error);
            alert(`搜索出现问题，请稍后再试。详情: ${error.message}`); // 提示用户更详细的错误信息
        }
    }
// 显示搜索结果
    function displaySearchResults(results) {
        const container = document.querySelector('.container');
        if (!container) {
            console.error('未找到搜索结果容器元素');
            return;
        }

        // 清空当前内容
        container.innerHTML = '<h2>搜索结果</h2>';

        if (results.length === 0) {
            container.innerHTML += '<p>未找到相关软件</p>'; // 处理没有结果的情况
            return;
        }

        results.forEach(software => {
            const card = document.createElement('div');
            card.className = 'software-card';
            card.innerHTML = `
                <h3>${software.name}</h3>
                <p>${software.description}</p>
                <a href="${software.downloadUrl}" target="_blank">下载</a> <!-- 添加 target="_blank" 以便在新窗口中打开下载链接 -->
            `;
            container.appendChild(card);
        });
    }


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

// 获取免责声明按钮
const disclaimerButton = document.getElementById("disclaimer-button");

// 打开和关闭弹窗
settingButton.onclick = () => modal.style.display = "block";
closeButton.onclick = () => modal.style.display = "none";

// 显示免责声明
disclaimerButton.onclick = () => toggleDisclaimer(true);

// 假设还有一个关闭免责声明的按钮
const closeDisclaimerButton = document.getElementById("close-disclaimer-btn");
closeDisclaimerButton.onclick = () => toggleDisclaimer(false);


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
// 关闭二维码弹窗
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
