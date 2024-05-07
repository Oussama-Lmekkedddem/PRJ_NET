/*active button class onclick*/

$('nav a').click(function(e) {
    e.preventDefault();
    $('nav a').removeClass('active');
    $(this).addClass('active');
    if(this.id === !'transinfo'){
        $('.payinfo').addClass('noshow');
    }
    else if(this.id === 'payinfo') {
        $('.payinfo').removeClass('noshow');
        $('.rightbox').children().not('.payinfo').addClass('noshow');
    }
    else if (this.id === 'transinfo') {
        $('.transinfo').removeClass('noshow');
        $('.rightbox').children().not('.transinfo').addClass('noshow');
    }
    else if(this.id === 'verfication') {
        $('.verfication').removeClass('noshow');
        $('.rightbox').children().not('.verfication').addClass('noshow');
    }
    else if(this.id === 'persinfo') {
        $('.persinfo').removeClass('noshow');
        $('.rightbox').children().not('.persinfo').addClass('noshow');
    }
    else if(this.id === 'getpdf') {
        $('.getpdf').removeClass('noshow');
        $('.rightbox').children().not('.getpdf').addClass('noshow');
    }
});








$(document).ready(function(){

//For Card Number formatted input
    var cardNum = document.getElementById('cr_no');
    cardNum.onkeyup = function (e) {
        if (this.value == this.lastValue) return;
        var caretPosition = this.selectionStart;
        var sanitizedValue = this.value.replace(/[^0-9]/gi, '');
        var parts = [];

        for (var i = 0, len = sanitizedValue.length; i < len; i += 4) {
            parts.push(sanitizedValue.substring(i, i + 4));
        }

        for (var i = caretPosition - 1; i >= 0; i--) {
            var c = this.value[i];
            if (c < '0' || c > '9') {
                caretPosition--;
            }
        }
        caretPosition += Math.floor(caretPosition / 4);

        this.value = this.lastValue = parts.join('-');
        this.selectionStart = this.selectionEnd = caretPosition;
    }

//For Date formatted input
    var expDate = document.getElementById('exp');
    expDate.onkeyup = function (e) {
        if (this.value == this.lastValue) return;
        var caretPosition = this.selectionStart;
        var sanitizedValue = this.value.replace(/[^0-9]/gi, '');
        var parts = [];

        for (var i = 0, len = sanitizedValue.length; i < len; i += 2) {
            parts.push(sanitizedValue.substring(i, i + 2));
        }

        for (var i = caretPosition - 1; i >= 0; i--) {
            var c = this.value[i];
            if (c < '0' || c > '9') {
                caretPosition--;
            }
        }
        caretPosition += Math.floor(caretPosition / 2);

        this.value = this.lastValue = parts.join('/');
        this.selectionStart = this.selectionEnd = caretPosition;
    }

// Radio button
    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

})




function generatePdf() {
    // Créer une nouvelle instance de jsPDF
    const doc = new jsPDF();

    // Ajouter du texte au PDF
    doc.text('This is your ticket PDF!', 10, 10);

    // Télécharger le PDF avec un nom de fichier spécifié
    doc.save('ticket.pdf');
}

// Ajouter un événement de clic au bouton pour générer le PDF
document.getElementById('generatePdfBtn').addEventListener('click', generatePdf);



















document.querySelectorAll('.BACK').forEach(backButton => {
    backButton.addEventListener('click', () => {

        const currentClass = document.querySelector('.leftbox .active').id;

        // Définir les actions de retour en fonction de la classe actuelle
        switch (currentClass) {
            case 'transinfo':
                window.location.href = 'index';
                break;
            case 'persinfo':
                document.querySelector('.transinfo').classList.remove('noshow');
                document.querySelector('.persinfo').classList.add('noshow');
                document.querySelector('#persinfo').classList.remove('active');
                document.querySelector('#transinfo').classList.add('active');
                break;
            case 'payinfo':
                document.querySelector('.persinfo').classList.remove('noshow'); // Afficher privacy
                document.querySelector('.payinfo').classList.add('noshow'); // Cacher payment
                document.querySelector('#payinfo').classList.remove('active');
                document.querySelector('#persinfo').classList.add('active');
                break;
            case 'verfication':
                document.querySelector('.payinfo').classList.remove('noshow'); // Afficher payment
                document.querySelector('.verfication').classList.add('noshow'); // Cacher subscription
                document.querySelector('#verfication').classList.remove('active');
                document.querySelector('#payinfo').classList.add('active');
                break;
            case 'getpdf':
                window.location.href = 'index';
                break;
            default:
                break;
        }
    });
});


// Fonction pour gérer les clics sur le bouton CTA
document.querySelectorAll('.CTA').forEach(ctaButton => {
    ctaButton.addEventListener('click', () => {
        const currentClass = document.querySelector('.leftbox .active').id;

        switch (currentClass) {
            case 'transinfo':
                document.querySelector('.persinfo').classList.remove('noshow');
                document.querySelector('.transinfo').classList.add('noshow');
                document.querySelector('#persinfo').classList.remove('active');
                document.querySelector('#transinfo').classList.add('active');
                // Envoyer les informations au backend
                // Ajouter ici le code pour envoyer les informations
                break;
            case 'persinfo':
                // Vérifier si tous les champs sont remplis
                const inputs = document.querySelectorAll('.persinfo input');
                const isFilled = Array.from(inputs).every(input => input.value.trim() !== '');
                if (isFilled) {
                    document.querySelector('.payinfo').classList.remove('noshow');
                    document.querySelector('.persinfo').classList.add('noshow');
                    document.querySelector('#payinfo').classList.remove('active');
                    document.querySelector('#persinfo').classList.add('active');
                    // Envoyer les informations au backend
                    // Ajouter ici le code pour envoyer les informations
                }
                break;
            case 'payinfo':
                // Vérifier si tous les champs sont remplis
                const paymentInputs = document.querySelectorAll('.payinfo input');
                const isPaymentFilled = Array.from(paymentInputs).every(input => input.value.trim() !== '');
                if (isPaymentFilled) {
                    document.querySelector('.verfication').classList.remove('noshow');
                    document.querySelector('.payinfo').classList.add('noshow');
                    document.querySelector('#verfication').classList.remove('active');
                    document.querySelector('#payinfo').classList.add('active');
                    // Envoyer les informations au backend
                    // Ajouter ici le code pour envoyer les informations
                }
                break;
            case 'verfication':
                // Vérifier si tous les champs sont remplis
                const subscriptionInputs = document.querySelectorAll('.verfication input');
                const isSubscriptionFilled = Array.from(subscriptionInputs).every(input => input.value.trim() !== '');
                if (isSubscriptionFilled) {
                    const inputValue = document.querySelector('.verfication input').value.trim();
                    const seatNumber = 123456; // Exemple de numéro de siège à comparer
                    if (inputValue === seatNumber.toString()) {
                        document.querySelector('.getpdf').classList.remove('noshow'); // Afficher settings
                        document.querySelector('.verfication').classList.add('noshow'); // Cacher subscription
                        document.querySelector('#verfication').classList.remove('active');
                        document.querySelector('#getpdf').classList.add('active');

                        // Envoyer les informations au backend
                        // Ajouter ici le code pour envoyer les informations
                    } else {
                        document.querySelector('.virification-error').classList.remove('noshow'); // Afficher message d'erreur
                    }
                }
                break;
            default:
                break;
        }
    });
});
