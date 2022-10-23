using AquiEstoy_MongoDB.Data.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AquiEstoy_MongoDB.Data.Repository
{
    public class AquiEstoyCollection : IAquiEstoyCollection
    {
        internal MongoDBRepository _repository = new MongoDBRepository();
        private IMongoCollection<UserEntity> userCollection;
        private IMongoCollection<PetEntity> petCollection;

        public AquiEstoyCollection()
        {
            userCollection = _repository.db.GetCollection<UserEntity>("Users");
            petCollection = _repository.db.GetCollection<PetEntity>("Pets");
        }

        //USERS COLLECTION
        public async void CreateUser(UserEntity user)
        {
            await userCollection.InsertOneAsync(user);
        }

        public async Task<UserEntity> GetUserAsync(string userId)
        {
            return await userCollection.Find(x => x.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserEntity>> GetAllUsersAsync()
        {
            var result = await userCollection.FindAsync(x => true).Result.ToListAsync();
            return result;
        }

        public bool UpdateUser(UserEntity userModel)
        {
            userCollection.ReplaceOne(sub => sub.Id == userModel.Id, userModel);
            return true;
        }
        public async Task DeleteUserAsync(string userId)
        {
            var userPets = await GetAllPetsAsync(userId);
            foreach (var pet in userPets)
            {
                await DeletePetAsync(pet.Id);
            }
            await userCollection.DeleteOneAsync(x => x.Id == userId);
        }


        //PETS COLLECTION
        public async Task<IEnumerable<PetEntity>> GetAllPetsAsync(string userId)
        {
            var result = await petCollection.FindAsync(x => x.UserID == userId).Result.ToListAsync();
            return result;
        }
        public async void CreatePet(PetEntity pet, string userId)//ya contiene el id de usuario al que pertenece
        {
            pet.UserID = userId;
            await petCollection.InsertOneAsync(pet);
        }
        public async Task<PetEntity> GetPetAsync(string petId, string userId)
        {
            return await petCollection.Find(x => x.UserID == userId && x.Id == petId).FirstOrDefaultAsync();
        }
        public async Task DeletePetAsync(string petId)
        {
            await petCollection.DeleteOneAsync(x => x.Id == petId);
        }

    }
}
