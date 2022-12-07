using Halide.Models;

namespace Halide.Interfaces
{
    public interface IUserRepository
    {
        User GetUserById(int id);
        List<Review> GetReviewsByUserId(int id);
        void CreateUser(User user);
    }
}
