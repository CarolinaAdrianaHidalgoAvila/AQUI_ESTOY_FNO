using AquiEstoy_MongoDB.Data.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace AquiEstoy_MongoDB.Models
{
    public class PetModel
    {
        public ObjectId IdPet { get; set; }

        public string? NamePet { get; set; }
        public DateOnly? BirthDate { get; set; }

        public string? Gender { get; set; }
        public bool? HasNecklace { get; set; }
        public string? Specie { get; set; }
        public UserEntity? UserID { get; set; }
    }
}
