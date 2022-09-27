using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
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

            public async Task<IEnumerable<PetModel>> GetAllPetsAsync()
            {
                var petsEntityList = await _userCollection.GetAllPetsAsync();
                var petsModelList = _mapper.Map<IEnumerable<PetModel>>(petsEntityList);
                return petsModelList;
            }

        
    }
}
