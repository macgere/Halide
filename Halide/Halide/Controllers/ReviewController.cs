using Microsoft.AspNetCore.Mvc;
using Halide.Interfaces;
using Halide.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Halide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private IReviewRepository _reviewRepo;
        public ReviewController(IReviewRepository reviewRepo)
        {
            _reviewRepo = reviewRepo;
        }
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public Review Get(int id)
        {
            return _reviewRepo.GetReviewById(id);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _reviewRepo.DeleteReviewById(id);
        }

        // GET api/<UserController>/5
        [HttpGet]
        public List<Review> Get()
        {
            return _reviewRepo.GetAllReviews();
        }

        // POST api/<UserController>
        [HttpPost("newReview")]
        public void Post(Review review)
        {
            try
            {
                _reviewRepo.CreateReview(review);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}