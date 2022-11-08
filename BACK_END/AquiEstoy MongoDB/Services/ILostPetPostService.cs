﻿using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface ILostPetPostService
    {
        Task<LostPetPostModel> CreateLostPetPostAsync(LostPetPostModel lostPetPostModel, string userId);
        Task<IEnumerable<LostPetPostModel>> GetAllLostPetsPostsAsync(string userId);
        Task<LostPetPostModel> GetLostPetPostAsync(string postId);
        Task DeleteLostPetPostAsync(string postId);
    }
}
