using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Importation de ILogger
using PRJ_NET.Data;
using PRJ_NET.Models.Entities;
using System.Linq;

namespace PRJ_NET.Controllers
{
    public class PaymentController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PaymentController> _logger; // Déclaration de ILogger

        public PaymentController(ApplicationDbContext context, ILogger<PaymentController> logger)
        {
            _context = context;
            _logger = logger; // Initialisation de ILogger
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
        public IActionResult transinfo(string car, string city1, string time1, string city2, string time2, string price, int quantity, int ticketId)
        {
            ViewBag.Car = car;
            ViewBag.City1 = city1;
            ViewBag.Time1 = time1;
            ViewBag.City2 = city2;
            ViewBag.Time2 = time2;
            ViewBag.Price = price;
            ViewBag.Quantity = quantity;
            ViewBag.TicketId = ticketId;
            HttpContext.Session.SetInt32("TicketId", ViewBag.TicketId);
            HttpContext.Session.SetInt32("Quantity", ViewBag.Quantity);

            return View();
        }

        [HttpPost]
        public IActionResult SaveClientInfo(string idcard, string firstname, string lastname, string email)
        {
            var newClient = new Client
            {
                ClientCNI = idcard,
                ClientFirstName = firstname,
                ClientLastName = lastname,
                ClientEmail = email
            };

            _context.Clients.Add(newClient);
            _context.SaveChanges();

            var clientId = newClient.ClientId;

            if (HttpContext.Session.GetInt32("TicketId").HasValue && HttpContext.Session.GetInt32("Quantity").HasValue)
            {
                int ticketId = HttpContext.Session.GetInt32("TicketId").Value;
                int quantity = HttpContext.Session.GetInt32("Quantity").Value;

                // Enregistrement des valeurs dans les logs
                _logger.LogInformation($"TicketId from session: {ticketId}");
                _logger.LogInformation($"Quantity from session: {quantity}");
                _logger.LogInformation($"id client: {clientId}");

                var ticket = _context.Tickets.FirstOrDefault(t => t.TicketId == ticketId);
                if (ticket != null)
                {
                    ticket.AvailableSeats -= 1;
                    _context.SaveChanges();

                    var newReservation = new Reservation
                    {
                        TicketId = ticketId,
                        ClientId = clientId,
                        SeatNumber = quantity,
                        PaymentValidated = false
                    };

                    _context.Reservations.Add(newReservation);
                    _context.SaveChanges();
                }
            }

            return RedirectToAction("payinfo");
        }
    }
}
