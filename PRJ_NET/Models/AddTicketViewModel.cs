namespace PRJ_NET.Models
{
    public class AddTicketViewModel
    {
        public string TransportName { get; set; }

        public string DepartureCity { get; set; }

        public string ArrivalCity { get; set; }

        public string DepartureTime { get; set; }

        public string ArrivalTime { get; set; }

        public int TicketPrice { get; set; }

    }
}