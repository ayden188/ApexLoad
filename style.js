
const faders = document.querySelectorAll('.fade-in');
const burger = document.querySelector('.burger');
const links = document.querySelector('.links');
const accountLink = document.getElementById('account-link'); // Pour la simulation de connexion
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');



function simulateLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    updateAccountLink(); 
    window.location.href = 'moncompte.html'; 
}

function simulateLogout() {
    localStorage.removeItem('isLoggedIn');
    updateAccountLink();
    // Redirige vers la page d'accueil
    window.location.href = 'index.html'; 
}

function updateAccountLink() {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (accountLink) {
        if (loggedIn) {
            accountLink.href = 'moncompte.html';
            accountLink.textContent = 'Mon Compte';
            accountLink.classList.add('logged-in'); 
        } else {
            accountLink.href = 'auth.html';
            accountLink.textContent = 'Connexion / Inscription';
            accountLink.classList.remove('logged-in');
        }
    }
}

// Exécute la vérification au chargement de chaque page
updateAccountLink(); 


// =========================================================
// 2. FORMULAIRES DE CONNEXION/INSCRIPTION ET DÉCONNEXION
// =========================================================

// Lier les formulaires pour SIMULER la connexion
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        // Normalement ici: envoi au backend pour vérification
        simulateLogin(); 
    });
}
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        // Normalement ici: envoi au backend pour création de compte
        simulateLogin(); 
    });
}
// Gérer le bouton de déconnexion
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        simulateLogout();
    });
}


// =========================================================
// 3. MENU BURGER (Navigation Mobile)
// =========================================================
if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      links.classList.toggle('active');  
    });
}


// =========================================================
// 4. ONGLET CONNEXION/INSCRIPTION (sur auth.html)
// =========================================================
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});


// =========================================================
// 5. FAQ (Accordéon)
// =========================================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.icon');
        
        // Ferme tous les autres onglets ouverts avant d'ouvrir celui-ci (Optionnel mais recommandé)
        document.querySelectorAll('.faq-question.active').forEach(openBtn => {
            if(openBtn !== button) {
                 openBtn.classList.remove('active');
               openBtn.nextElementSibling.style.maxHeight = 0;
                openBtn.querySelector('.icon').style.transform = 'rotate(0deg)';
            }
         });
        
        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = 'rotate(45deg)'; 
        } else {
            answer.style.maxHeight = 0;
            icon.style.transform = 'rotate(0deg)';
        }
    });
});


// =========================================================
// 6. ANIMATION FADE-IN (Au Scroll)
// =========================================================
window.addEventListener('scroll', () => {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});


// =========================================================
// 7. NAVIGATION DU TABLEAU DE BORD (Mon Compte)
// =========================================================
document.querySelectorAll('.dashboard-nav a').forEach(navItem => {
    navItem.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const contentId = navItem.getAttribute('data-content');
        
        // 1. Désactiver tous les liens de navigation
        document.querySelectorAll('.dashboard-nav a').forEach(item => item.classList.remove('active'));
        
        // 2. Masquer tous les contenus
        document.querySelectorAll('.dashboard-content').forEach(content => content.classList.remove('active'));
        
        // 3. Activer le lien cliqué et le contenu correspondant
        navItem.classList.add('active');
        if (contentId) {
            document.getElementById(contentId).classList.add('active');
        }
        
    });
});
// Packs disponibles
const packsData = {
  freefire: [
    { name: "100 diamants", price: "1000 FCFA" },
    { name: "500 diamants", price: "4500 FCFA" },
    { name: "1000 diamants", price: "8000 FCFA" }
  ],
  cod: [
    { name: "200 CP", price: "2000 FCFA" },
    { name: "1000 CP", price: "9000 FCFA" }
  ],
  pubg: [
    { name: "60 UC", price: "1500 FCFA" },
    { name: "600 UC", price: "12000 FCFA" },
    { name: "600 UC", price: "12000 FCFA" }
  ]
};

// Affiche les packs du jeu choisi
function openPacks(game) {
  const packsSection = document.getElementById("sh-packs");
  const packsList = document.getElementById("sh-list");

  packsList.innerHTML = ""; // Reset

  packsData[game].forEach(pack => {
    const div = document.createElement("div");
    div.classList.add("sh-pack");

    div.innerHTML = `
      <h3>${pack.name}</h3>
      <p>${pack.price}</p>
      <button onclick="buyPack('${game}', '${pack.name}', '${pack.price}')">Acheter</button>
    `;

    packsList.appendChild(div);
  });

  packsSection.classList.remove("sh-hidden");
}

// Achat → redirection checkout
function buyPack(game, name, price) {
  const url = `checkout.html?game=${encodeURIComponent(game)}&pack=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
  window.location.href = url;
}
// =========================================================
// LOGIQUE JAVASCRIPT POUR LA PAGE CONTACT (contact.js)
// Simule l'envoi d'un formulaire sans backend
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('apexContactForm');
    const statusMessage = document.getElementById('formStatusMessage');
    const submitBtn = document.querySelector('.submit-contact-btn');

    if (!form) return; // S'assure que nous sommes sur la bonne page

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche l'envoi réel du formulaire

        // 1. Afficher le statut de traitement
        statusMessage.textContent = 'Envoi en cours... Veuillez patienter.';
        statusMessage.style.color = '#FFD166'; // Jaune
        submitBtn.disabled = true;

        // 2. Simuler un délai d'attente (comme un vrai appel API)
        setTimeout(() => {
            
            // --- Simulation de Succès ---
            
            // Récupère les données du formulaire pour les afficher (optionnel)
            const name = document.getElementById('contactName').value;
            
            statusMessage.innerHTML = `
                <i class="fas fa-check-circle"></i> Merci ${name} ! Votre message a été envoyé. 
                Notre équipe vous recontactera sous peu.
            `;
            statusMessage.style.color = '#00FF88'; // Vert pour succès
            
            // Réinitialise le formulaire
            form.reset();
            submitBtn.disabled = false;
            
            // Fait disparaître le message après 5 secondes
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 5000);

        }, 2000); // 2 secondes de délai simulé
    });
});
// =========================================================
// LOGIQUE DE LA PAGE DE RECHARGE (freefire.html)
// =========================================================

// --- A. Éléments DOM et Données ---
const diamondPacksGrid = document.getElementById('diamond-packs-grid');
const playerIdInput = document.getElementById('player-id-input');
const validateIdBtn = document.querySelector('.validate-id-btn');
const idValidationMessage = document.querySelector('.id-validation-message');
const playerInfoDiv = document.querySelector('.player-info');
const displayPlayerName = document.getElementById('display-player-name');

const summaryPlayerId = document.getElementById('summary-player-id');
const summaryPlayerName = document.getElementById('summary-player-name');
const summaryPackValue = document.getElementById('summary-pack-value');
const summaryTotalPrice = document.getElementById('summary-total-price');

let selectedPack = null; 
let currentPlayerId = null; 
let currentPlayersName = '---'; 

// Données des Packs de Diamants (Images simulées)
const freeFirePacks = [
    { id: 1, diamonds: 100, bonus: 10, price: 1000, img: 'https://via.placeholder.com/80/00C4FF/FFFFFF?text=100D' },
    { id: 2, diamonds: 300, bonus: 30, price: 3000, img: 'https://via.placeholder.com/80/00C4FF/FFFFFF?text=300D' },
    { id: 3, diamonds: 520, bonus: 50, price: 5000, img: 'https://via.placeholder.com/80/00C4FF/FFFFFF?text=520D' },
    { id: 4, diamonds: 1060, bonus: 100, price: 10000, img: 'https://via.placeholder.com/80/00C4FF/FFFFFF?text=1060D' },
    { id: 5, diamonds: 2180, bonus: 200, price: 20000, img: 'https://via.placeholder.com/80/00C4FF/FFFFFF?text=2180D' },
    { id: 6, diamonds: 5600, bonus: 500, price: 50000, img: 'https://via.placeholder.com/80/00C4FF/FFFFFF?text=5600D' }
];

// --- B. Génération et Affichage des Packs ---
function displayDiamondPacks() {
    if (!diamondPacksGrid) return; 

    diamondPacksGrid.innerHTML = ''; 

    freeFirePacks.forEach(pack => {
        const packItem = document.createElement('div');
        packItem.classList.add('pack-item');
        packItem.dataset.id = pack.id;
        packItem.dataset.diamonds = pack.diamonds;
        packItem.dataset.price = pack.price;
        packItem.dataset.bonus = pack.bonus; 

        // Utilise toLocaleString pour formater le prix avec des espaces (ex: 10 000)
        const priceFormatted = pack.price.toLocaleString('fr-FR');

        packItem.innerHTML = `
            <img src="${pack.img}" alt="${pack.diamonds} Diamants">
            <span class="pack-value">${pack.diamonds} Diamants</span>
            <span class="pack-bonus ${pack.bonus === 0 ? 'hidden' : ''}">+ ${pack.bonus} Bonus</span>
            <span class="pack-price">${priceFormatted} FCFA</span>
        `;
        diamondPacksGrid.appendChild(packItem);

        packItem.addEventListener('click', () => {
            document.querySelectorAll('.pack-item').forEach(item => item.classList.remove('selected'));
            packItem.classList.add('selected');
            selectedPack = pack; 
            updateOrderSummary();
        });
    });
}

if (validateIdBtn) {
    validateIdBtn.addEventListener('click', () => {
        const id = playerIdInput.value.trim();

        idValidationMessage.textContent = '';
        playerInfoDiv.style.display = 'none';

        if (id.length < 5 || !/^\d+$/.test(id)) { 
            idValidationMessage.textContent = 'Veuillez entrer un ID de joueur valide (chiffres seulement).';
            idValidationMessage.style.color = '#FF5733'; 
            currentPlayerId = null;
            currentPlayersName = '---';
            updateOrderSummary();
            return;
        }

        idValidationMessage.textContent = 'Vérification de l\'ID en cours...';
        idValidationMessage.style.color = '#FFD166'; 

        setTimeout(() => {
            // SIMULATION: L'ID 123456 est toujours valide
            if (id === '123456') { 
                currentPlayerId = id;
                currentPlayersName = 'ApexGamer225'; // Nom simulé
                idValidationMessage.textContent = 'ID validé avec succès !';
                idValidationMessage.style.color = '#00FF88'; 
                
                displayPlayerName.textContent = currentPlayersName;
                playerInfoDiv.style.display = 'flex'; // Affiche l'info du joueur
            } else {
                idValidationMessage.textContent = 'ID non trouvé ou invalide. Veuillez vérifier.';
                idValidationMessage.style.color = '#FF5733';
                currentPlayerId = null;
                currentPlayersName = '---';
            }
            updateOrderSummary(); 
        }, 1500); 
    });
}

function updateOrderSummary() {
    if (!summaryPlayerId) return; 

    summaryPlayerId.textContent = currentPlayerId || '---';
    summaryPlayerName.textContent = currentPlayersName;

    if (selectedPack) {
        summaryPackValue.textContent = `${selectedPack.diamonds} Diamants (+ ${selectedPack.bonus} Bonus)`;
        summaryTotalPrice.textContent = `${selectedPack.price.toLocaleString('fr-FR')} FCFA`;
    } else {
        summaryPackValue.textContent = 'Aucun pack sélectionné';
        summaryTotalPrice.textContent = '0 FCFA';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (diamondPacksGrid) {
        displayDiamondPacks();
        updateOrderSummary();
    }
});
// Fichier: server.js (Simplifié)

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Pour accepter les données JSON

// 1. Point de terminaison pour la recharge
app.post('/api/recharge', (req, res) => {
    const { idJoueur, packID, methodePaiement } = req.body;

    // --- C'est ici que se passe la vraie logique Backend ! ---
    if (idJoueur === '123456') {
        // SIMULATION DE SUCCÈS
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message: "Paiement en attente. Livraison des diamants dans 30 secondes.",
                transactionId: "TX-" + Date.now()
            });
        }, 3000); 

    } else {
        // SIMULATION D'ÉCHEC
        res.status(400).json({
            success: false,
            message: "ID Joueur invalide. Veuillez vérifier l'identifiant."
        });
    }
});

app.listen(port, () => {
    console.log(`Serveur Back-End écoutant sur http://localhost:${port}`);
});
