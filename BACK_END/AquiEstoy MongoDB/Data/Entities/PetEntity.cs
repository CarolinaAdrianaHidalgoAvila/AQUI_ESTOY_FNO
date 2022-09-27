using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
namespace AquiEstoy_MongoDB.Data.Entities
{
        public class PetEntity
        {
            [Key]
            [BsonId]
            public ObjectId IdPet { get; set; }

            [BsonElement("namePet")]
            [JsonPropertyName("namePet")]
            public string? NamePet { get; set; }

            [BsonElement("birthDate")]
            [JsonPropertyName("birthDate")]
            public DateOnly? BirthDate { get; set; }

            [BsonElement("gender")]
            [JsonPropertyName("gender")]
            public string? Gender { get; set; }

            [BsonElement("hasNecklace")]
            [JsonPropertyName("hasNecklace")]
            public bool? HasNecklace { get; set; }

            [BsonElement("species")]
            [JsonPropertyName("species")]
            public string? Specie { get; set; }

            [BsonElement("userID")]
            [JsonPropertyName("userID")]
            public UserEntity? UserID { get; set; }
    }
    

}
