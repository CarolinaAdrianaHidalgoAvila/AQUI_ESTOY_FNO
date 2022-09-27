using AquiEstoy_MongoDB.Data.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AquiEstoy_MongoDB.Data.Repository
{
    public class UserCollection : IUserCollection
    {
        internal MongoDBRepository _repository = new MongoDBRepository();
        private IMongoCollection<UserEntity> userCollection;
        private IMongoCollection<PetEntity> petCollection;

        public UserCollection()
        {
            userCollection = _repository.db.GetCollection<UserEntity>("Users");
        }
        public async void CreateUser(UserEntity user)
        {
            await userCollection.InsertOneAsync(user);
        }

        public async Task<UserEntity> GetUserAsync(String userId)
        {
            return await userCollection.Find(x => x.Id == new ObjectId(userId)).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserEntity>> GetAllUsersAsync()
        {
            var result = await userCollection.FindAsync(x => true).Result.ToListAsync();
            return result;
        }
        public async Task<IEnumerable<PetEntity>> GetAllPetsAsync()
        {
            var result = await petCollection.FindAsync(x => true).Result.ToListAsync();
            return result;
        }
        public async Task<bool> SaveChangesAsync()
        {
            //try
            //{
            //    var result = await userCollection.
            //    return result > 0 ? true : false;

            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
            return true;
        }
    }
}
