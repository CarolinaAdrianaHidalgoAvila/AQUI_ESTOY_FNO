using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface IPetService
    {
        Task<PetModel> CreatePetAsync(PetModel petModel, string userId);
        Task<IEnumerable<PetModel>> GetAllPetsAsync(string userId);
        Task DeletePetAsync(string userId, string petId);
    }
}
