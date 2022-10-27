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
        private IMongoCollection<PublicationEntity> publicationCollection;

        public AquiEstoyCollection()
        {
            userCollection = _repository.db.GetCollection<UserEntity>("Users");
            petCollection = _repository.db.GetCollection<PetEntity>("Pets");
            publicationCollection = _repository.db.GetCollection<PublicationEntity>("Publications");
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
        //PUBLICATIONS COLLECTION
        public async Task<IEnumerable<PublicationEntity>> GetAllPublicationsAsync(string userId)
        {
            var result = await publicationCollection.FindAsync(x => x.UserID == userId).Result.ToListAsync();
            return result;
        }
        public async void CreatePublication(PublicationEntity publication, string userId)
        {
            publication.UserID = userId;
            await publicationCollection.InsertOneAsync(publication);
        }
        public async Task<PublicationEntity> GetPostAsync(string postId)
        {
            return await publicationCollection.Find(x => x.IdPublication == postId).FirstOrDefaultAsync();
        }

    }
}
