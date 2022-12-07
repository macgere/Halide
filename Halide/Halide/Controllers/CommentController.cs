
using Microsoft.AspNetCore.Mvc;
using Halide.Interfaces;
using Halide.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Halide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentRepository _commentRepo;
        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }
        // GET api/<UserController>/5
        [HttpGet("byReviewId/{id}")]
        public List<Comment> Get(int id)
        {
            return _commentRepo.GetCommentByReviewId(id);
        }

        // GET api/<UserController>/5
        /*        [HttpGet]
                public List<Review> Get()
                {
                    return _reviewRepo.GetAllReviews();
                }*/

        // POST api/<UserController>
        [HttpPost]
        public void Post(Comment comment)
        {
            try
            {
                _commentRepo.CreateComment(comment);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _commentRepo.DeleteCommentById(id);
        }
    }
}