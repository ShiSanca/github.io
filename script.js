// データを画面に反映させる関数
function renderInterview() {
    const app = document.getElementById('app');
    
    // リード文
    let html = `<section class="lead scroll-reveal"><p>${interviewData.lead}</p></section>`;
    html += `<article class="interview-body">`;

    // 本文のループ
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
}

// 実行
renderInterview();

// --- 以降、前回のスクロールアニメーションなどのコードをそのまま貼り付け ---
