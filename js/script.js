$(function() {
    let c = document.createElement('canvas');
    c.width = innerWidth;
    c.height = innerHeight;
    let ctx = c.getContext('2d');
    $('.container').append(c);

    let stars = Array(256).fill().map(() => ({
        x: Math.random() * innerWidth - innerWidth / 2,
        y: Math.random() * innerHeight - innerHeight / 2,
        z: Math.random() * innerWidth
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
            let m = 540 / s.z;
            s.x >= c.width * 0.5 ? s.x = -c.width * 0.5 : s.x += 0.5;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
            ctx.fillRect(s.x * m + innerWidth * 0.5, s.y * m + innerHeight * 0.5, 1, 1);
        }
    }

    function loop() {
        update();
        requestAnimationFrame(loop);
    }
    loop();
})