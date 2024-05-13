



$(document).ready(function () {

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
    $('.radio-group .radio').click(function () {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

})





document.getElementById('generatePdfButton').addEventListener('click', function () {
    // Récupérer les informations de transport et personnelles
    const transportInfo = {
        villeDepart: document.getElementById('ReserveticketInfo').querySelector('#villeDepart').textContent,
        villeArrivee: document.getElementById('ReserveticketInfo').querySelector('#villeArrivee').textContent,
        heureDepart: document.getElementById('ReserveticketInfo').querySelector('#heureDepart').textContent,
        heureArrivee: document.getElementById('ReserveticketInfo').querySelector('#heureArrivee').textContent,
        numeroPlace: document.getElementById('ReserveticketInfo').querySelector('#numeroPlace').textContent,
        nomTransporteur: document.getElementById('ReserveticketInfo').querySelector('#nomTransporteur').textContent
    };

    const userInfo = {
        nomUtilisateur: document.getElementById('ReserveticketInfo').querySelector('#nomUtilisateur').textContent,
        CNI: document.getElementById('ReserveticketInfo').querySelector('#CNI').textContent
    };

    // Définir le contenu du PDF
    const pdfContent = {
        content: [
            { text: 'Ticket de Transport', style: 'header' },
            { text: transportInfo.nomTransporteur, style: 'transporterName' },
            {
                columns: [
                    {
                        width: '50%',
                        text: [
                            { text: 'Informations de Transport\n', style: 'infoSubtitle' },
                            `Ville de Départ: ${transportInfo.villeDepart}\n`,
                            `Ville d'Arrivée: ${transportInfo.villeArrivee}\n`,
                            `Heure de Départ: ${transportInfo.heureDepart}\n`,
                            `Heure d'Arrivée: ${transportInfo.heureArrivee}\n`,
                            `Numéro de Place: ${transportInfo.numeroPlace}\n`
                        ]
                    },
                    {
                        width: '50%',
                        text: [
                            { text: 'Informations Personnelles\n', style: 'infoSubtitle' },
                            `Nom d'utilisateur: ${userInfo.nomUtilisateur}\n`,
                            `CNI: ${userInfo.CNI}\n`
                        ]
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },
            transporterName: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 10, 0],
                fillColor: '#e3e3e3'
            },
            infoSubtitle: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5],
                fillColor: '#f5f5f5'
            }
        }
    };
    pdfMake.createPdf(pdfContent).download('ticket.pdf');
});