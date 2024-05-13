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




const greenSeat = "./images/green-seat.png";
const redSeat = "./images/red-seat.png";
const blackSeat = "./images/black-seat.png";

function toggleCard(cardId) {
    var card = document.getElementById('bus-place-card-' + cardId);
    const existingDivs = card.querySelectorAll('.RowImg');
    if (card.style.display === 'none') {
        card.style.display = 'block';

        var counter = 0;

        var hiddenList = document.getElementById('hidden-list-' + cardId);
        var numbersList = hiddenList.textContent.trim().split(',').map(num => parseInt(num));
        numbersList.sort((a, b) => a - b);

        existingDivs.forEach(existingDiv => {
            // Vérifier si des éléments existent déjà dans existingDiv
            if (existingDiv.querySelectorAll('.col').length === 0) {
                for (let i = 1; i <= 10; i++) {
                    const newDiv = document.createElement('div');
                    newDiv.id = cardId + "-" + (counter + i);
                    newDiv.classList.add('col');
                    newDiv.style.height = '35px';

                    const newImage = document.createElement('img');
                    newImage.classList.add('img-fluid');
                    newImage.style.width = '30px';

                    if (numbersList.includes(counter + i)) {
                        newDiv.classList.add('reserveseat');
                    } else {
                        newImage.src = greenSeat;
                        newDiv.classList.add('freeplace');

                        newDiv.onclick = function (event) {
                            const idParts = newDiv.id.split('-');
                            const counterAndI = idParts[idParts.length - 1];


                            const redplace = card.querySelector('.yourseat');
                            if (redplace) {
                                redplace.classList.replace('yourseat', 'freeplace');
                            }

                            newDiv.classList.replace('freeplace', 'yourseat')
                            const mySeatValueInput = document.getElementById('my-seat-value-' + cardId);
                            if (mySeatValueInput) {
                                mySeatValueInput.value = counterAndI;
                            }
                            const mySeatSpan = document.getElementById('my-seat-' + cardId);
                            if (mySeatSpan) {
                                mySeatSpan.textContent = counterAndI;
                            }

                            changeImagesByClass('bus-place-card-' + cardId);


                        };

                    }
                    newDiv.appendChild(newImage);

                    existingDiv.appendChild(newDiv);
                }
            }
            counter += 10;
        });

        let randomSeat;
        do {
            randomSeat = Math.floor(Math.random() * 40) + 1;
        } while (numbersList.includes(randomSeat));

        const randomSeatId = cardId + "-" + randomSeat;
        const randomSeatDiv = document.getElementById(randomSeatId);
        if (randomSeatDiv) {
            const randomSeatImage = randomSeatDiv.querySelector('img');
            randomSeatDiv.classList.replace('freeplace', 'yourseat');
            const mySeatValueInput = document.getElementById('my-seat-value-' + cardId);
            if (mySeatValueInput) {
                mySeatValueInput.value = randomSeat;
            }

            const mySeatSpan = document.getElementById('my-seat-' + cardId);
            if (mySeatSpan) {
                mySeatSpan.textContent = randomSeat;
            }
        }
        changeImagesByClass('bus-place-card-' + cardId);
    } else {
        card.style.display = 'none';
        existingDivs.forEach(existingDiv => {
            existingDiv.innerHTML = '';
        });
    }
}


function changeImagesByClass(parentId) {
    const parentDiv = document.getElementById(parentId);
    if (!parentDiv) {
        console.error("Parent div not found.");
        return;
    }

    const divsWithClasses = parentDiv.querySelectorAll('.yourseat, .freeplace, .reserveseat');
    divsWithClasses.forEach(div => {
        const img = div.querySelector('img');
        if (!img) {
            console.error("Image not found in div:", div.id);
            return;
        }

        if (div.classList.contains('yourseat')) {
            img.src = redSeat;
        } else if (div.classList.contains('freeplace')) {
            img.src = greenSeat;
        } else if (div.classList.contains('reserveseat')) {
            img.src = blackSeat;
        }
    });
}




const signInLink = document.getElementById('sign-in');
const adminForm = document.getElementById('admin-form');
const adminFormout = document.getElementById('admin-singout');

adminFormout.classList.add('d-none'); // Hide the sign out button initially

signInLink.addEventListener('click', function (event) {
    event.preventDefault();

    if (window.location.pathname.startsWith('/Tickets')) {
        adminFormout.classList.toggle('d-none');
    } else {
        adminForm.classList.toggle('d-none');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('admin-form');
    const form_out = document.getElementById('admin-singout');

    form_out.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        window.location.href = 'https://localhost:7039';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values of the email and password fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check if the credentials are correct
        if (email === 'admin@gmail.com' && password === 'admin') {
            window.location.href = 'https://localhost:7039/Tickets/Admin';
        } else {
            // Display an error message or perform other actions if the credentials are incorrect
            alert('Incorrect credentials. Please try again.');
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
