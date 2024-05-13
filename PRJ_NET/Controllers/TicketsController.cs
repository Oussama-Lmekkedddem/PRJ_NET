using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRJ_NET.Data;
using PRJ_NET.Models;
using PRJ_NET.Models.Entities;

namespace PRJ_NET.Controllers
{
    public class TicketsController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public TicketsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Admin()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Admin(AddTicketViewModel viewModel)
        {
            var ticket = new Ticket
            {
                TransportName = viewModel.TransportName,
                DepartureCity = viewModel.DepartureCity,
                ArrivalCity = viewModel.ArrivalCity,
                DepartureTime = viewModel.DepartureTime,
                ArrivalTime = viewModel.ArrivalTime,
                TicketPrice = viewModel.TicketPrice,
                DepartureDate = DateTime.Now,
                AvailableSeats = 40
            };

            await dbContext.Tickets.AddAsync(ticket);
            await dbContext.SaveChangesAsync();

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var tickets = await dbContext.Tickets.ToListAsync();
            return View(tickets);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var ticket = await dbContext.Tickets.FindAsync(id);

            return View(ticket);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Ticket viewModel)
        {
            var ticket = await dbContext.Tickets.FindAsync(viewModel.TicketId);
            if (ticket is not null)
            {
                ticket.TransportName = viewModel.TransportName;
                ticket.DepartureCity = viewModel.DepartureCity;
                ticket.ArrivalCity = viewModel.ArrivalCity;
                ticket.DepartureTime = viewModel.DepartureTime;
                ticket.ArrivalTime = viewModel.ArrivalTime;
                ticket.TicketPrice = viewModel.TicketPrice;
                ticket.DepartureDate = DateTime.Now;
                ticket.AvailableSeats = 40;

                await dbContext.SaveChangesAsync();
            }

            return RedirectToAction("List", "Tickets");
        }

        [HttpPost]
        public async Task<IActionResult> Delete(Ticket viewModel)
        {
            var ticket = await dbContext.Tickets
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.TicketId == viewModel.TicketId);
            if (ticket is not null)
            {
                dbContext.Tickets.Remove(viewModel);
                await dbContext.SaveChangesAsync();
            }

            return RedirectToAction("List", "Tickets");
        }

    }
}
