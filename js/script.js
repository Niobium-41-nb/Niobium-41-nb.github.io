// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化功能
    initMobileMenu();
    initFormSubmission();
    updateCurrentYear();
    loadGitHubProjects();
    initSmoothScroll();
});

// 移动端菜单切换
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击链接后关闭菜单（移动端）
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// 表单提交处理
function initFormSubmission() {
    const form = document.getElementById('messageForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有字段');
                return;
            }
            
            // 模拟发送消息（实际项目中应该发送到服务器）
            alert(`感谢 ${name} 的消息！\n\n我们已收到您的消息，会尽快回复。\n\n（注：这是一个演示网站，消息不会实际发送）`);
            
            // 重置表单
            form.reset();
        });
    }
}

// 更新当前年份
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// 加载GitHub项目（模拟数据，实际可以调用GitHub API）
function loadGitHubProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    // 模拟项目数据（实际项目中可以调用GitHub API获取真实数据）
    const projects = [
        {
            title: "算法竞赛代码库",
            description: "包含我在ICPC竞赛中使用的算法模板和解题代码，涵盖数据结构、图论、动态规划等。",
            tags: ["C++", "算法", "竞赛"],
            link: "https://github.com/Niobium-41-nb/algorithm-library"
        },
        {
            title: "个人博客系统",
            description: "使用Vue.js和Node.js构建的个人博客系统，支持Markdown编辑和文章分类。",
            tags: ["Vue.js", "Node.js", "MongoDB"],
            link: "https://github.com/Niobium-41-nb/blog-system"
        },
        {
            title: "数据可视化工具",
            description: "基于D3.js的数据可视化工具，可以将CSV数据转换为交互式图表和图形。",
            tags: ["JavaScript", "D3.js", "数据可视化"],
            link: "https://github.com/Niobium-41-nb/data-visualization"
        }
    ];
    
    // 清除加载骨架
    projectsGrid.innerHTML = '';
    
    // 创建项目卡片
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" rel="noopener" class="project-link">
                    查看项目 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        // 添加悬停效果
        projectCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        projectCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        projectsGrid.appendChild(projectCard);
    });
    
    // 添加项目卡片样式
    const style = document.createElement('style');
    style.textContent = `
        .project-content {
            padding: 30px;
        }
        
        .project-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2d3436;
            margin-bottom: 15px;
        }
        
        .project-description {
            color: #636e72;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        .project-tag {
            background-color: #f1f2f6;
            color: #2d3436;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        
        .project-link {
            display: inline-flex;
            align-items: center;
            color: #0984e3;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .project-link:hover {
            color: #2d3436;
        }
        
        .project-link i {
            margin-left: 8px;
            transition: transform 0.3s ease;
        }
        
        .project-link:hover i {
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动
function initSmoothScroll() {
    // 为所有导航链接添加平滑滚动
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 如果是空链接或非页面内锚点，跳过
            if (targetId === '#' || !document.querySelector(targetId)) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '15px 0';
    }
    
    // 高亮当前部分
    highlightCurrentSection();
});

// 高亮当前滚动到的部分
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = '#' + section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSectionId) {
            link.classList.add('active');
        }
    });
}

// 添加导航链接激活样式
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #2d3436 !important;
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);