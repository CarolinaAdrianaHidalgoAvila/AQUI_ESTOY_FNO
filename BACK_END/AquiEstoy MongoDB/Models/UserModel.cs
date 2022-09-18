using MongoDB.Bson;

namespace AquiEstoy_MongoDB.Models
{
    public class UserModel
    {
        public ObjectId Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
    }
}
