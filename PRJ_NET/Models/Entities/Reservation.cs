using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PRJ_NET.Models.Entities
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        public int TicketId { get; set; }

        public int ClientId { get; set; }

        public int SeatNumber { get; set; }

        public bool PaymentValidated { get; set; }
    }
}
