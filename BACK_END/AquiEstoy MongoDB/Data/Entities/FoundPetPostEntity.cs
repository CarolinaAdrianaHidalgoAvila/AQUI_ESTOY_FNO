﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AquiEstoy_MongoDB.Data.Entities
{
    public class FoundPetPostEntity
    {
        [Key]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string IdPublication { get; set; }

        [BsonElement("namePet")]
        [JsonPropertyName("namePet")]
        public string? NamePet { get; set; }
        [BsonElement("species")]
        [JsonPropertyName("species")]
        public string? Species { get; set; }

        [BsonElement("datePublication")]
        [JsonPropertyName("datePublication")]
        public DateTime DatePublication { get; set; }//Revisar fechas

        [BsonElement("location")]
        [JsonPropertyName("location")]
        public string? Location { get; set; }

        [BsonElement("email")]
        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [BsonElement("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [BsonElement("perWhoFound")]
        [JsonPropertyName("personWhoFound")]
        public string? PersonWhoFound { get; set; }

        [BsonElement("userID")]
        [JsonPropertyName("userID")]
        public string? UserID { get; set; }
    }
}
