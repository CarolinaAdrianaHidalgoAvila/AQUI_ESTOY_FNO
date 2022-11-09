﻿using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AutoMapper;

namespace AquiEstoy_MongoDB.Services
{
    public class FoundPetPostService : IFoundPetPostService
    {
        private IAquiEstoyCollection _aquiEstoyCollection;
        private IMapper _mapper;

        public FoundPetPostService(IAquiEstoyCollection aquiEstoyCollection, IMapper mapper)
        {
            _aquiEstoyCollection = aquiEstoyCollection;
            _mapper = mapper;
        }
        public async Task<IEnumerable<FoundPetPostModel>> GetAllFoundPetsPostsAsync(string userId)
        {
            await ValidateUser(userId);
            var foundPetsPostsEntityList = await _aquiEstoyCollection.GetAllFoundPetsPostsAsync(userId);
            var foundPetsPostsModelList = _mapper.Map<IEnumerable<FoundPetPostModel>>(foundPetsPostsEntityList);
            return foundPetsPostsModelList;
        }

        public async Task<FoundPetPostModel> GetFoundPetPostAsync(string foundPetPostId)
        {
            var foundPetPostEntity = await _aquiEstoyCollection.GetFoundPetPostAsync(foundPetPostId);
            if (foundPetPostEntity == null)
            {
                throw new NotFoundOperationException($"The found pet post id: {foundPetPostId}, does not exist.");
            }
            var foundPetPostModel = _mapper.Map<FoundPetPostModel>(foundPetPostEntity);
            return foundPetPostModel;
        }

        public async Task UpdateFoundPetPostAsync(string userId, string foundPetPostId, FoundPetPostModel foundPetPostModel)
        {
            await ValidateUser(userId);
            await GetFoundPetPostAsync(foundPetPostId);
            var foundPetPostEntity = _mapper.Map<FoundPetPostEntity>(foundPetPostModel);
            await _aquiEstoyCollection.UpdateFoundPetPostAsync(foundPetPostId, foundPetPostEntity);
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