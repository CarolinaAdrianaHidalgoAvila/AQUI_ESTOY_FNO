namespace AquiEstoy_MongoDB.Models
{
    public class PublicationModel
    {
        public string IdPublication { get; set; } = string.Empty;

        public string? NamePet { get; set; }
        public string? Species { get; set; }
        public string? DatePublication { get; set; }
        public string? Location { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public string? UserID { get; set; }
    }
}
