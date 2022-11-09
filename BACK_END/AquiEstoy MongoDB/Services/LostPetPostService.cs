using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AutoMapper;

namespace AquiEstoy_MongoDB.Services
{
    public class LostPetPostService : ILostPetPostService
    {
        private IAquiEstoyCollection _aquiEstoyCollection;
        private IMapper _mapper;
        public LostPetPostService(IAquiEstoyCollection aquiEstoyCollection, IMapper mapper)
        {
            _aquiEstoyCollection = aquiEstoyCollection;
            _mapper = mapper;
        }

        public async Task<LostPetPostModel> CreateLostPetPostAsync(LostPetPostModel publicationModel, string userId)
        {
            await ValidateUser(userId);
            var lostPetPostEntity = _mapper.Map<LostPetPostEntity>(publicationModel);
            _aquiEstoyCollection.CreateLostPetPost(lostPetPostEntity, userId);
            var newLostPetPostModel = _mapper.Map<LostPetPostModel>(lostPetPostEntity);
            return newLostPetPostModel;
        }


        public async Task<IEnumerable<LostPetPostModel>> GetAllLostPetsPostsAsync(string userId)
        {
            await ValidateUser(userId);
            var lostPetsPostsEntityList = await _aquiEstoyCollection.GetAllLostPetsPostsAsync(userId);
            var lostPetsPostsModelList = _mapper.Map<IEnumerable<LostPetPostModel>>(lostPetsPostsEntityList);
            return lostPetsPostsModelList;
        }

        public async Task<LostPetPostModel> GetLostPetPostAsync(string postId)
        {
            var lostPetPostEntity = await _aquiEstoyCollection.GetLostPetPostAsync(postId);
            if (lostPetPostEntity == null)
            {
                throw new NotFoundOperationException($"The post id: {postId}, does not exist.");
            }
            var lostPetPostModel = _mapper.Map<LostPetPostModel>(lostPetPostEntity);
            return lostPetPostModel;
        }

        public async Task DeleteLostPetPostAsync(string postId)
        {
            await GetLostPetPostAsync(postId);
            await _aquiEstoyCollection.DeleteLostPetPostAsync(postId);
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
