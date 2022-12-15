using Halide.Models;

namespace Halide.Interfaces
{
    public interface IUserRepository
    {
        User GetUserById(int id);
        int GetUserByEmailAndPassword(string email, string password);
        List<Review> GetReviewsByUserId(int id);
        void CreateUser(User user);
    }
}
