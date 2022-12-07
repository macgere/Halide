using Microsoft.AspNetCore.Mvc;
using Halide.Interfaces;
using Halide.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Halide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepo;
        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userRepo.GetUserById(id);
        }

        [HttpGet("reviewsBy/{id}")]
        public List<Review> GetReviewsByUserId(int id)
        {
            return _userRepo.GetReviewsByUserId(id);
        }

        // POST api/<UserController>
        [HttpPost("newUser")]
        public void Post(User user)
        {
            try
            {
                _userRepo.CreateUser(user);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}