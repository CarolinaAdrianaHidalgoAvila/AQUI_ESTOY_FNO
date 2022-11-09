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
        private IMongoCollection<LostPetPostEntity> lostPetPostCollection;
        private IMongoCollection<FoundPetPostEntity> foundPetPostCollection;

        public AquiEstoyCollection()
        {
            userCollection = _repository.db.GetCollection<UserEntity>("Users");
            petCollection = _repository.db.GetCollection<PetEntity>("Pets");
            lostPetPostCollection = _repository.db.GetCollection<LostPetPostEntity>("Publications");
            foundPetPostCollection = _repository.db.GetCollection<FoundPetPostEntity>("Found Pets Posts");
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

        public async Task UpdateUser(string userId, UserEntity userEntity)
        {
            userEntity.Id = userId;
            await userCollection.ReplaceOneAsync(sub => sub.Id == userId, userEntity);
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
        public async Task UpdatePetAsync(string petId, PetEntity petEntity) 
        {
            petEntity.Id = petId;
            await petCollection.ReplaceOneAsync(sub => sub.Id == petId, petEntity);
        }
        public async Task DeletePetAsync(string petId)
        {
            await petCollection.DeleteOneAsync(x => x.Id == petId);
        }


        //LOST PETS POSTS COLLECTION
        public async Task<IEnumerable<LostPetPostEntity>> GetAllLostPetsPostsAsync(string userId)
        {
            var result = await lostPetPostCollection.FindAsync(x => x.UserID == userId).Result.ToListAsync();
            return result;
        }
        public async void CreateLostPetPost(LostPetPostEntity lostPetPostEntity, string userId)
        {
            lostPetPostEntity.UserID = userId;
            await lostPetPostCollection.InsertOneAsync(lostPetPostEntity);
        }
        public async Task<LostPetPostEntity> GetLostPetPostAsync(string postId)
        {
            return await lostPetPostCollection.Find(x => x.IdPublication == postId).FirstOrDefaultAsync();
        }
        public async Task DeleteLostPetPostAsync(string postId)
        {
            await lostPetPostCollection.DeleteOneAsync(x => x.IdPublication == postId);
        }



        //FOUND PET POSTS COLLECTION
        public async Task<IEnumerable<FoundPetPostEntity>> GetAllFoundPetsPostsAsync(string userId)
        {
            var result = await foundPetPostCollection.FindAsync(x => x.UserID == userId).Result.ToListAsync();
            return result;
        }
        public async Task<FoundPetPostEntity> GetFoundPetPostAsync(string postId)
        {
            return await foundPetPostCollection.Find(x => x.IdPublication == postId).FirstOrDefaultAsync();
        }
        public async Task UpdateFoundPetPostAsync(string userId, FoundPetPostEntity foundPetPostEntity)
        {

        }
    }
}
