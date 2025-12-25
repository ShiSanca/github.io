function renderInterview() {
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
        } else {
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

    // --- HTMLを作った直後にアニメーションの準備をする ---
    startAnimations();
}

function startAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ページが読み込まれたら実行
window.addEventListener('DOMContentLoaded', renderInterview);

// プログレスバー（ここはそのまま）
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("progress-bar");
    if (bar) bar.style.width = scrolled + "%";
};
