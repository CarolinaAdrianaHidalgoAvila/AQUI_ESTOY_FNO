using AquiEstoy_MongoDB.Data.Entities;

namespace AquiEstoy_MongoDB.Data.Repository
{
    public interface IAquiEstoyCollection
    {
        //USERS
        void CreateUser(UserEntity userEntity);
        Task<IEnumerable<UserEntity>> GetAllUsersAsync();
        Task<UserEntity> GetUserAsync(string userId);
        bool UpdateUser(UserEntity userModel);
        Task DeleteUserAsync(string userId);


        //PETS
        Task<IEnumerable<PetEntity>> GetAllPetsAsync(string userId);
        void CreatePet(PetEntity petEntity, string userId);
        Task<PetEntity> GetPetAsync(string petId, string userId);
        Task DeletePetAsync(string petId);
    }
}
