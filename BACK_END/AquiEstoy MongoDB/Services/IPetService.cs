using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface IPetService
    {
        Task<PetModel> CreatePetAsync(PetModel pet);
        Task<IEnumerable<PetModel>> GetAllPetsAsync(string userId);
    }
}
