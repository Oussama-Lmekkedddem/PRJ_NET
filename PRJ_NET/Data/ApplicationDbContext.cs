using Microsoft.EntityFrameworkCore;
using PRJ_NET.Models.Entities;


namespace PRJ_NET.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
