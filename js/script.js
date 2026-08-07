document.addEventListener('DOMContentLoaded', () => {
    // 1. Ocultar pantalla de bienvenida y reproducir la canción con audio
    const enterButton = document.getElementById('enterButton');
    const introScreen = document.getElementById('introScreen');
    const iframe = document.getElementById('youtubeVideo');

    if (enterButton && introScreen) {
        enterButton.addEventListener('click', () => {
            // Desvanecer la pantalla de bienvenida
            introScreen.classList.add('hidden');

            // Enviar orden a la API de YouTube para quitar silencio y reproducir
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
        });
    }

    // 2. Lógica de Contadores de tiempo en vivo
    const fechaConocimos = new Date('2026-04-10T00:00:00');
    const fechaAniversario = new Date('2026-06-24T00:00:00');

    function updateCounters() {
        const now = new Date();

        function calculateTime(fromDate) {
            let diff = now - fromDate;
            if (diff < 0) diff = 0;

            const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
            const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

            const months = Math.floor(daysTotal / 30);
            const remainingDays = daysTotal % 30;

            return {
                daysTotal: `${daysTotal} días`,
                timeString: `${months} meses · ${remainingDays} días · ${hours}:${minutes}:${seconds}`
            };
        }

        const conocimos = calculateTime(fechaConocimos);
        const aniversario = calculateTime(fechaAniversario);

        const elCounterConocimos = document.getElementById('counterConocimos');
        const elTimeConocimos = document.getElementById('timeConocimos');
        const elCounterAniversario = document.getElementById('counterAniversario');
        const elTimeAniversario = document.getElementById('timeAniversario');

        if (elCounterConocimos) elCounterConocimos.innerText = conocimos.daysTotal;
        if (elTimeConocimos) elTimeConocimos.innerText = conocimos.timeString;
        if (elCounterAniversario) elCounterAniversario.innerText = aniversario.daysTotal;
        if (elTimeAniversario) elTimeAniversario.innerText = aniversario.timeString;
    }

    // Actualizar cada segundo
    setInterval(updateCounters, 1000);
    updateCounters();
});

// 3. Lógica para los carruseles laterales de fotos
const indices = { left: 0, right: 0 };

function moveCarousel(side, direction) {
    const track = document.getElementById(`track-${side}`);
    if (!track) return;

    const cards = track.querySelectorAll('.photo-card');
    if (cards.length === 0) return;

    // Quitar la clase active a la foto actual
    cards[indices[side]].classList.remove('active');
    
    // Calcular el siguiente índice (bucle)
    indices[side] = (indices[side] + direction + cards.length) % cards.length;
    
    // Mostrar la nueva foto
    cards[indices[side]].classList.add('active');
}
