using Halide.Interfaces;
using Halide.Models;
using System.Data.SqlClient;

namespace Halide.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public CommentRepository(IConfiguration config)
        {
            _config = config;
        }
        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }
        public List<Comment> GetCommentByReviewId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [comment] i
                                JOIN [review] f
                                ON f.id = i.reviewId
                                WHERE i.reviewId = @id
                            ";
                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Comment> items = new List<Comment>();
                        while (reader.Read())
                        {
                            Comment comment = new Comment()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("id")),
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                commentBody = reader.GetString(reader.GetOrdinal("commentBody")),
                                reviewId = reader.GetInt32(reader.GetOrdinal("reviewId")),
                                dateTime = reader.GetString(reader.GetOrdinal("dateTime"))
                            };
                            items.Add(comment);
                        }
                        return items;
                    }
                }
            }
        }
        public void CreateComment(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO [comment](userId, commentBody, reviewId, dateTime)
                                        VALUES(@userId, @commentBody, @reviewId, @dateTime);
                                    ";

                    cmd.Parameters.AddWithValue("@userId", comment.userId);
                    cmd.Parameters.AddWithValue("@commentBody", comment.commentBody);
                    cmd.Parameters.AddWithValue("@reviewId", comment.reviewId);
                    cmd.Parameters.AddWithValue("@dateTime", comment.dateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteCommentById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                DELETE FROM [comment]
                                WHERE id = @id
                            ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}