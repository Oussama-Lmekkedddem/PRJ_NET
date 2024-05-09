using System.ComponentModel.DataAnnotations;

namespace PRJ_NET.Models.Entities
{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }

        public string ClientCNI { get; set; }

        public string ClientFirstName { get; set; }

        public string ClientLastName { get; set; }

        public string ClientEmail { get; set; }
    }
}
