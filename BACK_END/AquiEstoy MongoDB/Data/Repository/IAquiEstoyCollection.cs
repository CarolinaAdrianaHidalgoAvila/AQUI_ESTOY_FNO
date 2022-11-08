﻿using AquiEstoy_MongoDB.Data.Entities;

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


        //LOST PETS POSTS
        Task<IEnumerable<LostPetPostEntity>> GetAllLostPetsPostsAsync(string userId);
        void CreateLostPetPost(LostPetPostEntity lostPetPostEntity, string userId);
        Task<LostPetPostEntity> GetLostPetPostAsync(string postId);
        Task DeleteLostPetPostAsync(string postId);
    }
}
