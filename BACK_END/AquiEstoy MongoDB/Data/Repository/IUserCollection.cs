using AquiEstoy_MongoDB.Data.Entities;

namespace AquiEstoy_MongoDB.Data.Repository
{
    public interface IUserCollection
    {
        void CreateUser(UserEntity user);
        Task<IEnumerable<UserEntity>> GetAllUsersAsync();
        Task<UserEntity> GetUserAsync(string userId);

        //PETS
        Task<IEnumerable<PetEntity>> GetAllPetsAsync(string userId);
        void CreatePet(PetEntity pet);
    }
}
