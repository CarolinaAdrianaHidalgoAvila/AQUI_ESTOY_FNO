using AquiEstoy_MongoDB.Models;

namespace AquiEstoy_MongoDB.Services
{
    public interface IPublicationService
    {
        Task<PublicationModel> CreatePublicationAsync(PublicationModel publicationModel, string userId);
        Task<IEnumerable<PublicationModel>> GetAllPublicationsAsync(string userId);
        Task<PublicationModel> GetPostAsync(string postId);
    }
}
