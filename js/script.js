document.addEventListener('DOMContentLoaded', () => {
    // 1. Ocultar pantalla de bienvenida
    const enterButton = document.getElementById('enterButton');
    const introScreen = document.getElementById('introScreen');

    if (enterButton && introScreen) {
        enterButton.addEventListener('click', () => {
            introScreen.classList.add('hidden');
        });
    }

    // 2. Lógica de Contadores de tiempo
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

        document.getElementById('counterConocimos').innerText = conocimos.daysTotal;
        document.getElementById('timeConocimos').innerText = conocimos.timeString;

        document.getElementById('counterAniversario').innerText = aniversario.daysTotal;
        document.getElementById('timeAniversario').innerText = aniversario.timeString;
    }

    setInterval(updateCounters, 1000);
    updateCounters();
});

// 3. Lógica de los Carruseles de Fotos
const indices = { left: 0, right: 0 };

function moveCarousel(side, direction) {
    const track = document.getElementById(`track-${side}`);
    if (!track) return;

    const cards = track.querySelectorAll('.photo-card');
    if (cards.length === 0) return;

    cards[indices[side]].classList.remove('active');
    
    indices[side] = (indices[side] + direction + cards.length) % cards.length;
    
    cards[indices[side]].classList.add('active');
}