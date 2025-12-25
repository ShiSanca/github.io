function renderPage() {
    // 1. タイトル部分の生成
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

interviewData.content.forEach(item => {
    if (item.role === 'quote') {
        html += `<blockquote class="pull-quote scroll-reveal">${item.text}</blockquote>`;
    } 
    else if (item.role === 'image') {
        // ★ 画像用のHTMLを追加
        html += `
            <div class="article-image scroll-reveal">
                <img src="${item.url}" alt="interview photo" style="width:100%; height:auto; margin: 40px 0;">
                ${item.caption ? `<p class="caption" style="text-align:center; font-size:0.8rem; color:#888; margin-top:-30px; margin-bottom:40px;">${item.caption}</p>` : ''}
            </div>`;
    }
    else {
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

    // 3. HTML生成後にアニメーション監視を開始
    initScrollReveal();
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // 生成された要素をすべて監視対象にする
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// プログレスバーの制御
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("progress-bar");
    if (bar) bar.style.width = scrolled + "%";
});

// ページの読み込み完了時に実行
document.addEventListener('DOMContentLoaded', renderPage);

