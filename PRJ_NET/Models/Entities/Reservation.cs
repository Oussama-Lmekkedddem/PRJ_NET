using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PRJ_NET.Models.Entities
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }
        [ForeignKey("Ticket")]
        public int TicketId { get; set; }
        public virtual Ticket Ticket { get; set; }
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual  Client Client { get; set; }

        public int SeatNumber { get; set; }

        public bool PaymentValidated { get; set; }
    }
}
