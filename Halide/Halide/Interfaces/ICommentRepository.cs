using Halide.Models;

namespace Halide.Interfaces
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentByReviewId(int id);
        void CreateComment(Comment comment);

        void DeleteCommentById(int id);
    }
}
