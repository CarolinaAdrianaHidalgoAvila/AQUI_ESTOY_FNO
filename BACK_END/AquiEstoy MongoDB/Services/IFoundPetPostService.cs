using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface IFoundPetPostService
    {
        Task<IEnumerable<FoundPetPostModel>> GetAllFoundPetsPostsAsync(string userId);
        Task<FoundPetPostModel> GetFoundPetPostAsync(string postId);
        Task UpdateFoundPetPostAsync(string userId, string foundPetPostId, FoundPetPostModel foundPetPostModel);
    }
}
