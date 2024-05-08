// Define arrays to store bus and ticket information
var busList = [];
var Ticket =  [];
var ticketList = [];


$(function () {
    // Start counting from the total number of rows initially present in the table
    var counter = 3;

    $("#insertRow").on("click", function (event) {
        event.preventDefault();

        var newRow = $("<tr>").css('position', 'relative');

        var cols = '';

        var pId = (counter - 1).toString(); // Convert to string

        var trElement = $("#ticketTable tr").filter(function () {
            return $(this).find('th').text() === pId;
        });

        var lastRow = trElement.find('td:nth-child(4)');
        lastRow.html('<input class="form-control rounded-0" type="number" min="0" name="price[' + (counter - 1) + ']" placeholder="Price" required>');


        // Table columns
        cols += '<th scope="row">' + counter + '</th>';
        cols += '<td>' +
            '<input class="form-control rounded-0 city-input" type="text" name="city[' + counter + ']" placeholder="Select City" required="">' +
            '<div class="dropdown-menu city-suggestions" style="position: absolute; margin-top: -8px; z-index: 100;"></div>' +
            '</td>';
        cols += '<td><input class="form-control rounded-0 time-input" type="text" name="time[' + counter + ']" placeholder="HH:MM" required></td>';
        cols += '<td></td>';
        cols += '<td><button class="btn btn-danger rounded-2 p-1 deleteRow" style="width: 35px; height: 35px;"><img src="../images/delete.png" style="width: 22px; display: block; margin: auto;"></button></td>';

        // Insert the columns inside a row
        newRow.append(cols);

        // Insert the row inside the table body
        $("#ticketTable tbody").append(newRow);

        // Increase counter after each row insertion
        counter++;
    });

    // Remove row when delete btn is clicked
    $("table").on("click", ".deleteRow", function (event) {
        $(this).closest("#ticketTable tr").remove();

        updateRowNumbers();
    });

    // Function to update row numbers
    function updateRowNumbers() {
        $("#ticketTable tbody tr").each(function (index) {
            $(this).find('#ticketTable th').text(index + 1);
        });
        counter = $("#ticketTable tbody tr").length + 1;


        var pId = (counter - 1).toString(); // Convert to string

        var trElement = $("#ticketTable tr").filter(function () {
            return $(this).find('th').text() === pId;
        });

        var lastRow = trElement.find('td:nth-child(4)');
        lastRow.html('');
    }




    $("#reservationForm").submit(function (event) {
        event.preventDefault();

        // Get bus information from the form
        var busName = $("#carName").val();
        var availableSeats = $("#availableSeats").val();

        // Create a new bus object
        var bus = {
            id: busList.length + 1,
            name: busName,
            seats: availableSeats
        };

        // Add the new bus object to the busList array
        busList.push(bus);

        ticketList = [];
        // Get ticket information from the table
        $("#ticketTable tbody tr").each(function () {
            var city = $(this).find('input[name="city"]').val();
            var time = $(this).find('input[name="time"]').val();
            var price = $(this).find('input[name="price"]').val();
            var idt = $(this).find('th[scope="row"]').text();

            var ticket = {
                id: ticketList.length + 1,
                idTb: idt,
                idBus: bus.id,
                city: city,
                time: time,
                price: price
            };
            ticketList.push(ticket);
        });
        CreateTicket();

        // Display the contents of the busList and ticketList arrays
        console.log("Bus List:", busList);
        console.log("Ticket:", Ticket);

        // Reset the form fields and table rows after submission
        $("#reservationForm")[0].reset();
    });

});

function CreateTicket() {
    const NR = ticketList.length;

    for (let i = 0; i < NR - 1; i++) {
        for (let j = i + 1; j < NR; j++) {
            let S = 0;
            if(j === i+1){
                S += parseInt(ticketList[i].price);
            }
            else {
                for (let k = i; k <= j-1; k++) {
                    S += parseInt(ticketList[k].price);
                }
            }


            var ticket = {
                id: Ticket.length + 1,
                idBus: ticketList[i].idBus,
                cityD: ticketList[i].city,
                cityA: ticketList[j].city,
                timeD: ticketList[i].time,
                timeA: ticketList[j].time,
                price: S,
                pRes: 0
            };

            Ticket.push(ticket);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.input-text');
    const tableRows = document.querySelectorAll('#ShowticketsTable tbody tr');

    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();

        tableRows.forEach(row => {
            const rowData = row.textContent.toLowerCase();
            if (rowData.includes(searchText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});




function getInfo(button) {
    const parentRow = button.closest('tr');

    // Retrieve data from the <td> elements of the parent <tr>
    const counter = parentRow.querySelector('td:first-of-type').innerText;
    const transportName = parentRow.querySelector('td:nth-of-type(2)').innerText;
    const departureCity = parentRow.querySelector('td:nth-of-type(3)').innerText;
    const arrivalCity = parentRow.querySelector('td:nth-of-type(4)').innerText;
    const departureTime = parentRow.querySelector('td:nth-of-type(5)').innerText;
    const arrivalTime = parentRow.querySelector('td:nth-of-type(6)').innerText;
    const ticketPrice = parentRow.querySelector('td:nth-of-type(7)').innerText;
    const ticketId = parentRow.querySelector('input[name="ticketId"]').value;

    // Populate the form fields in the modal with the retrieved data
    document.getElementById('transportName').value = transportName;
    document.getElementById('departureCity').value = departureCity;
    document.getElementById('arrivalCity').value = arrivalCity;
    document.getElementById('departureTime').value = departureTime;
    document.getElementById('arrivalTime').value = arrivalTime;
    document.getElementById('ticketPrice').value = ticketPrice;

    // Set the ticket ID in the hidden input field
    document.getElementById('ticketId').value = ticketId;

    $('#updateModal').modal('show');


}


