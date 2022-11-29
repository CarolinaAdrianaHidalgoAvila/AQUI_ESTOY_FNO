using AquiEstoy_MongoDB.Exceptions;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace AquiEstoy_MongoDB.Services
{
    public class FileService : IFileService
    {
        public static Cloudinary cloudinary;

        public const string CLOUD_NAME = "dmvbmrdak";
        public const string API_KEY = "699754638721711";
        public const string API_SECRET = "X-xcsv1gHKABQSSeHHZl_olEZCk";

        public FileService()
        {
            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);
        }

        public string uploadImage(string imagePath)
        {
            try
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imagePath)
                };

                var uploadResult = cloudinary.Upload(uploadParams);
                string newPath = uploadResult.SecureUri.ToString();
                return newPath;
            }
            catch (Exception e)
            {
                throw new Exception("Error uploading user image");
            }
            
        }
    }
}
