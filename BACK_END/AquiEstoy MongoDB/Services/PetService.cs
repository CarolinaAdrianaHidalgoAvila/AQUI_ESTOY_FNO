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

            public async Task<IEnumerable<PetModel>> GetAllPetsAsync(string UserId)
            {
            await validateUser(UserId);
            var pets = await _userCollection.GetUserAsync(UserId);
            return _mapper.Map<IEnumerable<PetModel>>(pets);
        }
        private async Task validateUser(string userId)
        {
            var user = await _userCollection.GetUserAsync(userId); 
            if (user == null)
            {
                throw new NotFoundOperationException($"the company id:{userId}, does not exist");
            }
        }


    }
}
