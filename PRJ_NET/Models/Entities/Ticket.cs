using System.ComponentModel.DataAnnotations;

namespace PRJ_NET.Models.Entities
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        public string TransportName { get; set; }

        public DateTime DepartureDate { get; set; }

        public string DepartureCity { get; set; }

        public string ArrivalCity { get; set; }

        public string DepartureTime { get; set; }

        public string ArrivalTime { get; set; }

        public int TicketPrice { get; set; }

        public int AvailableSeats { get; set; }
    }
}
