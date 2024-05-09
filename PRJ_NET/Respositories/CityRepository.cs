using System.Collections.Generic;
using System.Linq;
using PRJ_NET.Data;
using PRJ_NET.Models.Entities;

namespace PRJ_NET.Repositories
{
    public class CityRepository
    {
        private readonly ApplicationDbContext _context;

        public CityRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<string> GetAllDepartureCities()
        {
            
            return _context.Tickets.Select(t => t.DepartureCity).Distinct().ToList();
        }

        public List<string> GetAllArrivalCities()
        {
            
            return _context.Tickets.Select(t => t.ArrivalCity).Distinct().ToList();
        }
    }
}
