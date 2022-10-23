using Microsoft.AspNetCore.Mvc;
using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AquiEstoy_MongoDB.Services;
using System.Threading.Tasks;

namespace AquiEstoy_MongoDB.Controllers
{
    [Route("api/users/{userId}/pets")]
    public class PetsController : ControllerBase
    {
        private IPetService _petService;

        public PetsController(IPetService petService)
        {
            _petService = petService;
        }

        [HttpPost]
        public async Task<ActionResult<PetModel>> PostPetAsync([FromBody] PetModel pet, string userId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newPet = await _petService.CreatePetAsync(pet, userId);
                return Created($"/users/{newPet.UserID}/{newPet.Id}", newPet);
            }
            catch (NotFoundOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetModel>>> GetPets(string userId)
        {
            try
            {
                return Ok(await _petService.GetAllPetsAsync(userId));
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

        [HttpDelete("{petId}")]
        public async Task<ActionResult> DeleteUsersAsync(string userId, string petId)
        {
            try
            {
                await _petService.DeletePetAsync(userId, petId);
                return Ok();
            }
            catch (NotFoundOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Simething happend.");
            }
        }
    }
}
