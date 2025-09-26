$(function() {
    let c = document.createElement('canvas');
    c.width = innerWidth;
    c.height = innerHeight;
    let ctx = c.getContext('2d');
    $('.container').append(c);
    Prism.languages.insertBefore('clike', 'keyword', {
        '@require': {
            pattern: /(?:@require)\b/,
            alias: 'keyword'
        },
        'entry': {
            pattern: /\b(?:entry)\b/,
            alias: 'keyword'
        },
        'each': {
            pattern: /\b(?:each)\b/,
            alias: 'keyword'
        }
    });
    $('code').each((i, v) => {
        $(v).html(Prism.highlight($(v).html() ?? '', Prism.languages[v.dataset.type ?? 'clike'], v.dataset.type ?? 'clike'))
    })
    let stars = Array(512).fill().map(() => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        s: Math.random()
    }))
    function update() {
        c.width = innerWidth;
        c.height = innerHeight;
        let grad = ctx.createLinearGradient(0, 0, 0, c.height);
        grad.addColorStop(0, '#440044ff');
        grad.addColorStop(1, '#000000ff');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, c.width, c.height);
        // Render stars
        for (let s of stars) {
            let i = (performance.now() / 20) * s.s
            ctx.fillStyle = `rgba(255, 255, 255, ${s.s})`;
            ctx.fillRect((s.x + i) % c.width, s.y % c.height, 1, 1);
        }
    }
    function loop() {
        update();
        requestAnimationFrame(loop);
    }
    loop();
})