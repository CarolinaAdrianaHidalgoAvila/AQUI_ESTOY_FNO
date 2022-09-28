using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AutoMapper;

namespace AquiEstoy_MongoDB.Services
{
    public class PetService: IPetService
    {
        private IAquiEstoyCollection _aquiEstoyCollection;
        private IMapper _mapper;
        public PetService(IAquiEstoyCollection aquiEstoyCollection, IMapper mapper)
        {
            _aquiEstoyCollection = aquiEstoyCollection;
            _mapper = mapper;
        }

        public async Task<PetModel> CreatePetAsync(PetModel petModel, string userId)
        {
            await ValidateUser(userId);
            var petEntity = _mapper.Map<PetEntity>(petModel);
            _aquiEstoyCollection.CreatePet(petEntity, userId);
            var newPetModel = _mapper.Map<PetModel>(petEntity);
            return newPetModel;
        }

        public async Task<IEnumerable<PetModel>> GetAllPetsAsync(string userId)
        {
            await ValidateUser(userId);
            var petsEntityList = await _aquiEstoyCollection.GetAllPetsAsync(userId);
            var petsModelList = _mapper.Map<IEnumerable<PetModel>>(petsEntityList);
            return petsModelList;
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
