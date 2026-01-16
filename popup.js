/* =========================================
   1. MODAL IMAGE SIMPLE (Screenshots GA4)
   ========================================= */

// Ouvre l'image en grand
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Vérif sécurité
    if(modal && modalImg) {
        modal.style.display = "flex"; // Force affichage flex
        // Petit délai pour l'animation opacity si tu en as une
        setTimeout(() => modal.classList.add('active'), 10);
        modalImg.src = src;
    } else {
        console.error("Erreur: Modal image introuvable dans le HTML");
    }
}


function closeModal() {
    const modal = document.getElementById('imageModal');
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = "none", 10);
    }
}

/* =========================================
   2. MODAL REFONTE (Avant/Après)
   ========================================= */

function openRedesignModal() {
    const modal = document.getElementById('redesignModal');
    if(modal) {
        modal.style.display = "flex";
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden'; // Bloque scroll body
        
        // Initialise les sliders APRÈS affichage (important pour calculs dimensions)
        setTimeout(initSliders, 100); 
    }
}

function closeRedesignModal() {
    const modal = document.getElementById('redesignModal');
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = "none", 10);
        document.body.style.overflow = 'auto'; // Débloque scroll
    }
}

// Navigation Tabs (Home / Listing / Product)
function showRedesignPage(pageId) {
    // Reset tabs
    document.querySelectorAll('.redesign-tab').forEach(t => t.classList.remove('active'));
    // Reset pages
    document.querySelectorAll('.redesign-page').forEach(p => p.classList.remove('active'));
    
    // Active clicked tab & page
    // Cherche le bouton correspondant au texte ou ID (plus robuste)
    const targetTab = Array.from(document.querySelectorAll('.redesign-tab')).find(btn => 
        btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(pageId)
    );
    if(targetTab) targetTab.classList.add('active');

    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) {
        targetPage.classList.add('active');
        // Re-calcul hauteur slider quand on change d'onglet
        initSliders();
    }
}


/* =========================================
   3. SLIDER LOGIC (Init & Drag)
   ========================================= */

function initSliders() {
    const wrappers = document.querySelectorAll('.before-after-wrapper');
    
    wrappers.forEach(wrapper => {
        const inner = wrapper.querySelector('.before-after-inner');
        const handle = wrapper.querySelector('.slider-handle');
        const imageBefore = wrapper.querySelector('.image-before');
        const imgRef = wrapper.querySelector('img'); 

        if (!inner || !handle || !imageBefore || !imgRef) return;

        // --- HAUTEUR DYNAMIQUE ---
        const adjustHeight = () => {
            const naturalH = imgRef.naturalHeight;
            const naturalW = imgRef.naturalWidth;
            const currentW = wrapper.offsetWidth;
            
            if (naturalW > 0 && currentW > 0) {
                const displayedHeight = (naturalH / naturalW) * currentW;
                inner.style.height = displayedHeight + 'px';
            }
        };

        if (imgRef.complete) adjustHeight();
        else imgRef.onload = adjustHeight;
        window.addEventListener('resize', adjustHeight);
        
        // --- DRAG LOGIC (FIABILISÉE) ---
        let isDragging = false;
        
        function updateSlider(x) {
            const rect = wrapper.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            position = Math.max(0, Math.min(100, position));
            
            handle.style.left = position + '%';
            imageBefore.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        }
        
        // Souris : on écoute sur le wrapper pour start, mais sur WINDOW pour move/up
        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            wrapper.style.cursor = 'grabbing'; // Visuel curseur
            handle.style.cursor = 'grabbing';
            updateSlider(e.clientX);
            e.preventDefault(); // Empêche sélection texte
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
            e.preventDefault();
        });
        
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                wrapper.style.cursor = 'grab';
                handle.style.cursor = 'ew-resize';
            }
        });
        
        // Touch (Mobile)
        wrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
            // Pas de preventDefault ici pour laisser le scroll vertical natif possible si besoin
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
}


/* =========================================
   4. FERMETURE ECHAP (Global)
   ========================================= */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeRedesignModal();
    }
});

/* =========================================
   5. MODAL INTEGRATIONS
   ========================================= */
function openEmbeedModal() {
    const modalemb = document.getElementById('embeedModal');
    if(modalemb) {
        modalemb.style.display = "flex";
        setTimeout(() => modalemb.classList.add('active'), 10);
        document.body.style.overflow = 'hidden'; // Bloque scroll body
            }
}

function closeEmbeedModal() {
    const modalemb = document.getElementById('embeedModal');
    if(modalemb) {
        modalemb.classList.remove('active');
        setTimeout(() => modalemb.style.display = "none", 10);
        document.body.style.overflow = 'auto'; // Débloque scroll
    }
}

// Navigation Tabs (Home / Listing / Product)
function showEmbeedPage(pageId) {
    // Reset tabs
    document.querySelectorAll('.embeed-tab').forEach(t => t.classList.remove('active'));
    // Reset pages
    document.querySelectorAll('.embeed-page').forEach(p => p.classList.remove('active'));

    // Active clicked tab & page
    // Cherche le bouton correspondant au texte ou ID (plus robuste)
    const targetTab = Array.from(document.querySelectorAll('.embeed-tab')).find(btn =>
        btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(pageId)
    );
    if(targetTab) targetTab.classList.add('active');

    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) {
        targetPage.classList.add('active');
    }
}