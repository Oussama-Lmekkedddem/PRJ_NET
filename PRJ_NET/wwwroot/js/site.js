const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Newom', 'Hoceima']; // Liste des villes

document.querySelectorAll('.city-input').forEach(cityInput => {
    const citySuggestions = cityInput.nextElementSibling;

    cityInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(searchText));

        if (searchText === '') {
            citySuggestions.style.display = 'none'; // Cacher les suggestions si le champ est vide
        } else if (filteredCities.length > 0) {
            citySuggestions.innerHTML = ''; // Effacer les suggestions précédentes
            filteredCities.forEach(city => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = city;
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.addEventListener('click', function () {
                    cityInput.value = city;
                    citySuggestions.style.display = 'none'; // Cacher les suggestions après la sélection
                });
                citySuggestions.appendChild(suggestionItem);
            });
            citySuggestions.style.display = 'block'; // Afficher les suggestions
        } else {
            citySuggestions.innerHTML = 'No cities found';
            citySuggestions.style.display = 'block'; // Afficher le message "Aucune ville trouvée"
        }
    });

    document.addEventListener('click', function (event) {
        if (!citySuggestions.contains(event.target) && event.target !== cityInput) {
            citySuggestions.style.display = 'none'; // Cacher les suggestions au clic en dehors
        }
    });
});


const signInLink = document.getElementById('sign-in');
const adminForm = document.getElementById('admin-form');

signInLink.addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien

    adminForm.classList.toggle('d-none'); // Affiche ou cache la div du formulaire
});




// Obtenez toutes les divs existantes avec la classe spécifiée
const existingDivs = document.querySelectorAll('.RowImg');

const greenSeat = "./images/green-seat.png";
const redSeat = "./images/red-seat.png";
const blackSeat = "./images/black-seat.png";

// Boucle à travers chaque div existante
existingDivs.forEach(existingDiv => {
    // Boucle pour ajouter 10 divs à chaque div existante
    for (let i = 1; i <= 10; i++) {
        // Créez une nouvelle div avec la classe Bootstrap pour une colonne et un style spécifié
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.style.height = '35px';

        // Créez une nouvelle image avec une source variable et des classes Bootstrap pour le contenu fluide
        const newImage = document.createElement('img');
        newImage.src = blackSeat;
        newImage.classList.add('img-fluid');
        newImage.style.width = '30px';

        // Ajoutez l'image à la nouvelle div
        newDiv.appendChild(newImage);

        // Ajoutez la nouvelle div à la div existante
        existingDiv.appendChild(newDiv);
    }
});

function toggleCard(cardId) {
    var card = document.getElementById('bus-place-card-' + cardId);
    if (card.style.display === 'none') {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
    }
}







document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('admin-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher l'envoi par défaut du formulaire

        // Récupérer les valeurs des champs email et password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Vérifier si les identifiants sont corrects
        if (email === 'admin@gmail.com' && password === 'admin') {
            // Rediriger vers la page admin.html
            window.location.href = 'admin';
        } else {
            // Afficher un message d'erreur ou effectuer d'autres actions si les identifiants ne sont pas corrects
            alert('Identifiants incorrects. Veuillez réessayer.');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const timeInputs = document.querySelectorAll(".time-input");

    timeInputs.forEach(input => {
        input.addEventListener("input", function () {
            let value = this.value.replace(/\D/g, ""); // Supprimer tout ce qui n'est pas un chiffre

            // Ajouter automatiquement ":" après chaque paire de chiffres
            if (value.length > 2) {
                value = value.slice(0, 2) + ":" + value.slice(2, 4);
            }

            // Mettre à jour la valeur de l'input
            this.value = value;

            // Valider le format du temps (00:00 à 23:59)
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                this.setCustomValidity("Le format du temps doit être HH:MM (24 heures)");
            } else {
                this.setCustomValidity(""); // Réinitialiser la validation personnalisée
            }
        });
    });

    document.addEventListener("submit", function (event) {
        const targetInput = event.target.querySelector(".time-input");
        if (targetInput) {
            const value = targetInput.value.replace(/\D/g, ""); // Supprimer tout ce qui n'est pas un chiffre
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

            if (!timeRegex.test(value)) {
                targetInput.setCustomValidity("Le format du temps doit être HH:MM (24 heures)");
                event.preventDefault(); // Empêcher la soumission du formulaire si une entrée est invalide
            } else {
                targetInput.setCustomValidity(""); // Réinitialiser la validation personnalisée
            }
        }
    });
});
