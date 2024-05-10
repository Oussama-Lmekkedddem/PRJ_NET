using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRJ_NET.Data;
using PRJ_NET.Models.Entities;
using System.Net.Sockets;

namespace PRJ_NET.Controllers
{
    public class PaymentController : Controller
    {
        private readonly ApplicationDbContext _context;
        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }
        public ActionResult getpdf()
        {

            return View();
        }

        public ActionResult payinfo()
        {

            return View();
        }

        public ActionResult verification()
        {

            return View();
        }
        public ActionResult persinfo()
        {

            return View();
        }


        [HttpPost]
        public IActionResult transinfo(string car, string city1, string time1, string city2, string time2, string price, int quantity, Guid ticketId)
        {

            ViewBag.Car = car;
            ViewBag.City1 = city1;
            ViewBag.Time1 = time1;
            ViewBag.City2 = city2;
            ViewBag.Time2 = time2;
            ViewBag.Price = price;
            ViewBag.Quantity = quantity;
            ViewBag.TicketId = ticketId;

            return View();
        }
        [HttpPost]
        public IActionResult SaveClientInfo(string idcard, string firstname, string lastname, string email)
        {
            // Créez un nouvel objet Client avec les informations fournies
            var newClient = new Client
            {
                ClientCNI = idcard,
                ClientFirstName = firstname,
                ClientLastName = lastname,
                ClientEmail = email
            };

            // Ajoutez le nouveau client à la base de données
            _context.Clients.Add(newClient);
            _context.SaveChanges();

            // Récupérez l'ID du client nouvellement ajouté
            var clientId = newClient.ClientId;

            // Vérifiez si ViewBag.TicketId est null
            if (ViewBag.TicketId != null)
            {
                // Récupérez l'ID du ticket depuis le ViewBag
                Guid ticketId = (Guid)ViewBag.TicketId;

                // Décrémentez le nombre de places disponibles dans le billet
                var seatNumber = ViewBag.Quantity; // Assurez-vous que ViewBag.Quantity contient le nombre de places réservées
                var ticket = _context.Tickets.FirstOrDefault(t => t.TicketId == ticketId);
                if (ticket != null)
                {
                    ticket.AvailableSeats -= seatNumber; // Décrémentez le nombre de places disponibles
                    _context.SaveChanges();

                    // Créez une nouvelle réservation avec les informations de ticket et de client
                    var newReservation = new Reservation
                    {
                        TicketId = ticketId,
                        ClientId = clientId,
                        SeatNumber = seatNumber, // Utilisez le nombre de places réservées
                        PaymentValidated = false // Vous pouvez définir cela en fonction de votre logique métier
                    };

                    // Ajoutez la nouvelle réservation à la base de données
                    _context.Reservations.Add(newReservation);
                    _context.SaveChanges();
                }
            }

            // Redirigez l'utilisateur vers une autre page ou affichez un message de confirmation
            return RedirectToAction("payinfo");
        }



    }
}



