using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AquiEstoy_MongoDB.Services;
using Microsoft.AspNetCore.Mvc;

namespace AquiEstoy_MongoDB.Controllers
{
    [Route("api/users/{userId}/publications")]
    public class PublicationsController : ControllerBase
    {
        private IPublicationService _publicationService;

        public PublicationsController(IPublicationService publicationService)
        {
            _publicationService = publicationService;
        }

        [HttpPost]
        public async Task<ActionResult<PublicationModel>> PostPublicationAsync([FromBody] PublicationModel publication, string userId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newPublication = await _publicationService.CreatePublicationAsync(publication, userId);
                return Created($"/users/{newPublication.UserID}/{newPublication.IdPublication}", newPublication);
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
        public async Task<ActionResult<IEnumerable<PublicationModel>>> GetPublications(string userId)
        {
            try
            {
                return Ok(await _publicationService.GetAllPublicationsAsync(userId));
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

        [HttpGet("{postId}")]
        public async Task<ActionResult<UserModel>> GetPostAsync(string postId)
        {
            try
            {
                var post = await _publicationService.GetPostAsync(postId);
                return Ok(post);
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
    }
}
