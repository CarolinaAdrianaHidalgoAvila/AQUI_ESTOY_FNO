using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AutoMapper;

namespace AquiEstoy_MongoDB.Services
{
    public class PublicationService : IPublicationService
    {
        private IAquiEstoyCollection _aquiEstoyCollection;
        private IMapper _mapper;
        public PublicationService(IAquiEstoyCollection aquiEstoyCollection, IMapper mapper)
        {
            _aquiEstoyCollection = aquiEstoyCollection;
            _mapper = mapper;
        }

        public async Task<PublicationModel> CreatePublicationAsync(PublicationModel publicationModel, string userId)
        {
            await ValidateUser(userId);
            var publicationEntity = _mapper.Map<PublicationEntity>(publicationModel);
            _aquiEstoyCollection.CreatePublication(publicationEntity, userId);
            var newPublicationModel = _mapper.Map<PublicationModel>(publicationEntity);
            return newPublicationModel;
        }


        public async Task<IEnumerable<PublicationModel>> GetAllPublicationsAsync(string userId)
        {
            await ValidateUser(userId);
            var publicationsEntityList = await _aquiEstoyCollection.GetAllPublicationsAsync(userId);
            var publicationsModelList = _mapper.Map<IEnumerable<PublicationModel>>(publicationsEntityList);
            return publicationsModelList;
        }


        public async Task<PublicationModel> GetPostAsync(string postId)
        {
            var postEntity = await _aquiEstoyCollection.GetPostAsync(postId);
            if (postEntity == null)
            {
                throw new NotFoundOperationException($"The post id: {postId}, does not exist.");
            }
            var postModel = _mapper.Map<PublicationModel>(postEntity);
            return postModel;
        }

        private async Task ValidateUser(string userId)
        {
            var user = await _aquiEstoyCollection.GetUserAsync(userId);
            if (user == null)
            {
                throw new NotFoundOperationException($"The user id: {userId}, does not exist.");
            }
        }
    }
}
