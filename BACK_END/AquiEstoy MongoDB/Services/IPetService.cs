using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface IPetService
    {
        Task<IEnumerable<PetModel>> GetAllPetsAsync();
    }
}
