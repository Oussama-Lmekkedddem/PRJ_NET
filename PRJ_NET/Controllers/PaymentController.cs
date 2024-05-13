using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Importation de ILogger
using PRJ_NET.Data;
using PRJ_NET.Models.Entities;
using System.Linq;
using System.Net.Mail;
using System.Net;

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
            // Récupérer les informations nécessaires du ticket et du client
            var car = HttpContext.Session.GetString("Car");
            var city1 = HttpContext.Session.GetString("City1");
            var time1 = HttpContext.Session.GetString("Time1");
            var city2 = HttpContext.Session.GetString("City2");
            var time2 = HttpContext.Session.GetString("Time2");
            var price = HttpContext.Session.GetInt32("Price");
            var quantity = HttpContext.Session.GetInt32("Quantity");

            var firstname = HttpContext.Session.GetString("Firstname");
            var lastname = HttpContext.Session.GetString("Lastname");
            var idcard = HttpContext.Session.GetString("Idcard");
            var email = HttpContext.Session.GetString("ClientEmail");

            // Passer les informations à la vue
            ViewBag.Car = car;
            ViewBag.City1 = city1;
            ViewBag.Time1 = time1;
            ViewBag.City2 = city2;
            ViewBag.Time2 = time2;
            ViewBag.Price = price;
            ViewBag.Quantity = quantity;
            ViewBag.Firstname = firstname;
            ViewBag.Lastname = lastname;
            ViewBag.Idcard = idcard;
            ViewBag.Email = email;

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
        public IActionResult transinfo(string car, string city1, string time1, string city2, string time2, int price, int quantity, int ticketId)
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
            HttpContext.Session.SetString("Car", ViewBag.Car);
            HttpContext.Session.SetString("City1", ViewBag.City1);
            HttpContext.Session.SetString("Time1", ViewBag.Time1);
            HttpContext.Session.SetString("City2", ViewBag.City2);
            HttpContext.Session.SetString("Time2", ViewBag.Time2);
            HttpContext.Session.SetInt32("Price", ViewBag.Price);
            



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
            HttpContext.Session.SetString("ClientEmail", email); 
            HttpContext.Session.SetString("Firstname", firstname);
            HttpContext.Session.SetString("Lastname", lastname);
            HttpContext.Session.SetString("Idcard", idcard);

            if (HttpContext.Session.GetInt32("TicketId").HasValue && HttpContext.Session.GetInt32("Quantity").HasValue)
            {
                int ticketId = HttpContext.Session.GetInt32("TicketId").Value;
                int quantity = HttpContext.Session.GetInt32("Quantity").Value;


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
                    var reservationId = newReservation.ReservationId;
                    HttpContext.Session.SetInt32("ReservationId", reservationId);
                }
            }

            return RedirectToAction("payinfo");
        }





        private string GenerateAndSendVerificationCode()
        {
            Random random = new Random();
            var recipientEmail= HttpContext.Session.GetString("ClientEmail");
            int verificationCode = random.Next(100000, 999999);
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("lmousolm@gmail.com");
                    mail.To.Add(recipientEmail);
                    mail.Subject = "Verification Code";
                    mail.Body = $"Your verification code is: {verificationCode}";

                    using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtpClient.Credentials = new NetworkCredential("lmousolm@gmail.com", "eifemefcuhobhrlh");
                        smtpClient.EnableSsl = true;
                        smtpClient.Send(mail);
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error sending verification code: {ex.Message}";
            }

            return verificationCode.ToString();
        }


        [HttpPost]
        public IActionResult SavePayInfo(string holdername, string cardno, string cvcpwd, string exp, string email)
        {

            string verificationCode = GenerateAndSendVerificationCode();

            TempData["VerificationCode"] = verificationCode;

            return RedirectToAction("verification");
        }

        [HttpPost]
        public IActionResult VerificationPayInfo(string userCode, string verificationCode)
        {

            if (userCode == verificationCode)
            {
                var reservationId = HttpContext.Session.GetInt32("ReservationId").Value;

                var reservation = _context.Reservations.FirstOrDefault(r => r.ReservationId == reservationId);
                if (reservation != null)
                {
                    reservation.PaymentValidated = true; 
                    _context.SaveChanges();
                }

                return RedirectToAction("getpdf");
            }
            else
            {
                TempData["VerificationCode"] = verificationCode;
                TempData["VerificationError"] = "Error: Verification code mismatch";
                return RedirectToAction("verification");
            }
        }

    }
}
