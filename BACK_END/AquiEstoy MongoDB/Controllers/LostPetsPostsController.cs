﻿using AquiEstoy_MongoDB.Exceptions;
using AquiEstoy_MongoDB.Models;
using AquiEstoy_MongoDB.Services;
using Microsoft.AspNetCore.Mvc;

namespace AquiEstoy_MongoDB.Controllers
{
    [Route("api/users/{userId}/lostPetsPosts")]
    public class LostPetsPostsController : ControllerBase
    {
        private ILostPetPostService _lostPetsPostsService;

        public LostPetsPostsController(ILostPetPostService publicationService)
        {
            _lostPetsPostsService = publicationService;
        }

        [HttpPost]
        public async Task<ActionResult<LostPetPostModel>> PostLostPetsPostsAsync([FromBody] LostPetPostModel publication, string userId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newPublication = await _lostPetsPostsService.CreateLostPetPostAsync(publication, userId);
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
        public async Task<ActionResult<IEnumerable<LostPetPostModel>>> GetLostPetsPosts(string userId)
        {
            try
            {
                return Ok(await _lostPetsPostsService.GetAllLostPetsPostsAsync(userId));
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
        public async Task<ActionResult<UserModel>> GetLostPetPostAsync(string postId)
        {
            try
            {
                var post = await _lostPetsPostsService.GetLostPetPostAsync(postId);
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

        [HttpDelete("{postId}")]
        public async Task<ActionResult> DeleteLostPetPostAsync(string postId)
        {
            try
            {
                await _lostPetsPostsService.DeleteLostPetPostAsync(postId);
                return Ok();
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
