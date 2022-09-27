using Microsoft.AspNetCore.Mvc;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AquiEstoy_MongoDB.Services;
using System.Threading.Tasks;

namespace AquiEstoy_MongoDB.Controllers
{
    [Route("users/{userId:int}/[controller]")]
    public class PetsController : ControllerBase
    {
        private IPetsService _petService;

        public PetsController(IPetsService petService)
        {
            _petService = petService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetModel>>> GetPets(int userId)
        {
            try
            {
                return Ok(await _petService.GetPetsAsync(userId));
            }
            catch (NotFoundOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
    }
}
