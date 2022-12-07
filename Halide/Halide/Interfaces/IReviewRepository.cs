using Halide.Models;

namespace Halide.Interfaces
{
    public interface IReviewRepository
    {
        List<Review> GetAllReviews();
        Review GetReviewById(int id);

        void CreateReview(Review review);

        void DeleteReviewById(int id);
    }
}
