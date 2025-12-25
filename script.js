function renderPage() {
    // 1. ヒーローセクション（トップ画像）の設定
    const heroSection = document.getElementById('hero-section');
    if (heroSection && interviewData.heroImage) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${interviewData.heroImage}')`;
    }

    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        heroContent.innerHTML = `
            <span class="category">${interviewData.category}</span>
            <h1>${interviewData.title}</h1>
            <p class="author">${interviewData.author}</p>
        `;
    }

    // 2. 記事本文の生成
    const app = document.getElementById('app');
    if (!app) return;

    let html = `
        <section class="lead scroll-reveal">
            <p>${interviewData.lead}</p>
        </section>
        <article class="interview-body">
    `;

    // 本文データのループ処理
    interviewData.content.forEach(item => {
        if (item.role === 'quote') {
            // 引用のデザイン
            html += `<blockquote class="pull-quote scroll-reveal">${item.text}</blockquote>`;
        } 
        else if (item.role === 'image') {
            // ★ 文中画像のデザイン
            html += `
                <div class="article-image scroll-reveal">
                    <img src="${item.url}" alt="interview photo">
                    ${item.caption ? `<p class="caption">${item.caption}</p>` : ''}
                </div>`;
        }
        else {
            // 発言者（編集部・ゲスト）のデザイン
            const isGuest = item.role === 'guest' ? 'guest-row' : '';
            html += `
                <div class="chat-row scroll-reveal ${isGuest}">
                    <div class="speaker-label ${item.role}">${item.name}</div>
                    <div class="text">${item.text}</div>
                </div>`;
        }
    });

    html += `</article>`;
    app.innerHTML = html;

    // 3. アニメーションの開始
    initScrollReveal();
}

// スクロールでふわっと出す設定（変更なし）
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// プログレスバー（変更なし）
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("progress-bar");
    if (bar) bar.style.width = scrolled + "%";
});

document.addEventListener('DOMContentLoaded', renderPage);
