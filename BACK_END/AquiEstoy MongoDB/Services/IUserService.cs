using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface IUserService
    {
        Task<UserModel> CreateUserAsync(UserModel userModel);
        Task<UserModel> GetUserAsync(string userId);
        Task<IEnumerable<UserModel>> GetAllUsersAsync();
        Task<UserModel> UpdateUserAsync(string userId, UserModel userModel);
    }
}
