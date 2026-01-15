
        let isFlipped = false;

        function flipPage() {
            const container = document.getElementById('flipContainer');
            const flipText = document.getElementById('flip-text');

            isFlipped = !isFlipped;

            if (isFlipped) {
                container.classList.add('flipped');
                flipText.textContent = '📄 Voir le CV';
            } else {
                container.classList.remove('flipped');
                flipText.textContent = '📄 Voir la lettre de motivation';
            }
        }

        function openModal(src) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modal.classList.add('active');
            modalImg.src = src;
        }

        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.remove('active');
        }

        // Fermer modal avec Echap
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });