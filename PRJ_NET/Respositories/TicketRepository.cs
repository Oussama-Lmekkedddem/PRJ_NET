using System;
using System.Collections.Generic;
using PRJ_NET.Data;
using PRJ_NET.Models.Entities; 

namespace PRJ_NET.Repositories
{
    public class TicketRepository
    {
        private readonly ApplicationDbContext _context; 

        public TicketRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Ticket> Search(string departureCity, string arrivalCity, DateTime selectedDate)
        {
            
            return _context.Tickets
                .Where(t => t.DepartureCity == departureCity && t.ArrivalCity == arrivalCity && t.DepartureDate.Date == selectedDate.Date)
                .ToList();
        }
    }
}
