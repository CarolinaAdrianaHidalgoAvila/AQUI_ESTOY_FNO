using AquiEstoy_MongoDB.Data.Entities;

namespace AquiEstoy_MongoDB.Data.Repository
{
    public interface IAquiEstoyCollection
    {
        //USERS
        void CreateUser(UserEntity userEntity);
        Task<IEnumerable<UserEntity>> GetAllUsersAsync();
        Task<UserEntity> GetUserAsync(string userId);
        Task UpdateUser(string userId, UserEntity userEntity);
        Task DeleteUserAsync(string userId);


        //PETS
        Task<IEnumerable<PetEntity>> GetAllPetsAsync(string userId);
        void CreatePet(PetEntity petEntity, string userId);
        Task<PetEntity> GetPetAsync(string petId, string userId);
        Task UpdatePetAsync(string petId, PetEntity petEntity);
        Task DeletePetAsync(string petId);


        //PUBLICATIONS
        Task<IEnumerable<PublicationEntity>> GetAllPublicationsAsync(string userId);
        void CreatePublication(PublicationEntity publicationEntity, string userId);
        Task<PublicationEntity> GetPostAsync(string postId);
    }
}
