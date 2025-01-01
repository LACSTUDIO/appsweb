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


// 显示免责声明弹窗
function showDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    modal.style.display = 'block';
}

// 关闭免责声明弹窗
function closeDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    modal.style.display = 'none';
}

// 点击弹窗外部区域时关闭弹窗
window.onclick = function(event) {
    const modal = document.getElementById('disclaimer-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}



// 二维码弹窗
function openQRCode(type) {
    const qrCodeUrlMap = {
        'blibli': 'img/qr/blibli.png',
        'coolapk': 'img/qr/coolapk.png',
        'xiaomi': 'img/qr/xiaomi.png',
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


// 控制侧边栏菜单的显示与隐藏
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const mainContent = document.getElementById('mainContent');

    // 如果侧边栏已经展开，隐藏它；否则，显示它
    if (sideMenu.style.left === '0px') {
        sideMenu.style.left = '-250px';  // 隐藏侧边栏
        mainContent.style.marginLeft = '0';  // 恢复主内容
    } else {
        sideMenu.style.left = '0';  // 显示侧边栏
        mainContent.style.marginLeft = '250px';  // 主内容向右偏移，避免被菜单遮挡
    }
}

// 灵动信息弹窗
function showStatusModal(message) {
    document.getElementById('status-message').innerText = message;
    document.getElementById('status-modal').style.display = 'block';
    setTimeout(closeStatusModal, 2000); // 2秒后自动关闭弹窗
}
// 关闭灵动信息弹窗
function closeStatusModal() {
    document.getElementById('status-modal').style.display = 'none';
}


document.getElementById('toggle-menu').addEventListener('click', function() {
    var sideMenu = document.getElementById('side-menu');
    var content = document.getElementById('main_content');

    sideMenu.classList.toggle('open');
    content.classList.toggle('open');
});