// Données des packs
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
    { name: "600 UC", price: "12000 FCFA" }
  ]
};

// Afficher les packs d’un jeu
function openPacks(game) {
  const packsSection = document.getElementById("packs");
  const packsList = document.getElementById("packs-list");
  
  // Réinitialiser la liste
  packsList.innerHTML = "";

  // Générer dynamiquement les packs du jeu choisi
  packsData[game].forEach(pack => {
    const div = document.createElement("div");
    div.classList.add("pack-card");

    div.innerHTML = `
      <h3>${pack.name}</h3>
      <p>Prix : ${pack.price}</p>
      <button onclick="buyPack('${game}', '${pack.name}', '${pack.price}')">
        Acheter
      </button>
    `;

    packsList.appendChild(div);
  });

  // Afficher la section
  packsSection.classList.remove("hidden");
}

// Rediriger vers la page de paiement
function buyPack(game, name, price) {
  // On passe le jeu, le pack et le prix dans l’URL
  const url = `checkout.html?game=${encodeURIComponent(game)}&pack=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
  window.location.href = url;
}
