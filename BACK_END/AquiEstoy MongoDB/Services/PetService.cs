using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AutoMapper;

namespace AquiEstoy_MongoDB.Services
{
    public class PetService: IPetService
    {
        private IUserCollection _userCollection;
        private IMapper _mapper;
        public PetService(IUserCollection userCollection, IMapper mapper)
        {
            _userCollection = userCollection;
            _mapper = mapper;
        }

        public async Task<PetModel> CreatePetAsync(PetModel pet)
        {
            var petEntity = _mapper.Map<PetEntity>(pet);
            _userCollection.CreatePet(petEntity);
            var petModel = _mapper.Map<PetModel>(petEntity);
            return petModel;
        }

        public async Task<IEnumerable<PetModel>> GetAllPetsAsync(string userId)
        {
            await ValidateUser(userId);
            var petsEntityList = await _userCollection.GetAllPetsAsync(userId);
            var petsModelList = _mapper.Map<IEnumerable<PetModel>>(petsEntityList);
            return petsModelList;
        }

        private async Task ValidateUser(string userId)
        {
            var user = await _userCollection.GetUserAsync(userId); 
            if (user == null)
            {
                throw new NotFoundOperationException($"The user id: {userId}, does not exist.");
            }
        }

    }
}
