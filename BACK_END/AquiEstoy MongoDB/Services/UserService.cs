using AquiEstoy_MongoDB.Data.Entities;
using AquiEstoy_MongoDB.Data.Repository;
using AquiEstoy_MongoDB.Models;
using AutoMapper;

namespace AquiEstoy_MongoDB.Services
{
    public class UserService:IUserService
    {
        private IUserCollection _userCollection;
        private IMapper _mapper;
        public UserService(IUserCollection userCollection, IMapper mapper)
        {
            _userCollection = userCollection;
            _mapper = mapper;
        }

        public async Task<UserModel> CreateUserAsync(UserModel user)
        {
            var userEntity = _mapper.Map<UserEntity>(user);
            _userCollection.CreateUser(userEntity);
            var result = await _userCollection.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<UserModel>(userEntity);
            }
            throw new Exception("Database Error");
        }

        public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
        {
            var usersEntityList = await _userCollection.GetAllUsersAsync();
            var usersModelList = _mapper.Map<IEnumerable<UserModel>>(usersEntityList);
            return usersModelList;
        }

        public async Task<UserModel> GetUserAsync(string userId)
        {
            var user = await _userCollection.GetUserAsync(userId);

            //if (user == null) Cuando se implementen errores**********
            //{
            //    throw new NotFoundElementException($"The player with id:{playerId} does not exists.");
            //}
            var userModel = _mapper.Map<UserModel>(user);
            return userModel;
        }
    }
}
