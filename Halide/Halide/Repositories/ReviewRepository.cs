using Halide.Interfaces;
using Halide.Models;
using System.Data.SqlClient;

namespace Halide.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public ReviewRepository(IConfiguration config)
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

        public List<Review> GetAllReviews()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM review
                            ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Review> reviews = new List<Review>();
                        while (reader.Read())
                        {
                            Review item = new Review()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("id")),
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                filmTitle = reader.GetString(reader.GetOrdinal("filmTitle")),
                                reviewBody = reader.GetString(reader.GetOrdinal("reviewBody")),
                                filmRating = reader.GetInt32(reader.GetOrdinal("filmRating")),
                                dateTime = reader.GetString(reader.GetOrdinal("dateTime"))
                            };
                            reviews.Add(item);
                        }
                        return reviews;
                    }
                }
            }

        }

        public Review GetReviewById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [review]
                                WHERE id = @id
                            ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        if (reader.Read())
                        {
                            Review review = new Review()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("id")),
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                filmTitle = reader.GetString(reader.GetOrdinal("filmTitle")),
                                reviewBody = reader.GetString(reader.GetOrdinal("reviewBody")),
                                filmRating = reader.GetInt32(reader.GetOrdinal("filmRating")),
                                dateTime = reader.GetString(reader.GetOrdinal("dateTime"))
                            };

                            return review;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }


        public void CreateReview(Review review)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO [review](userId, filmTitle, reviewBody, filmRating, dateTime)
                                        VALUES(@userId, @filmTitle, @reviewBody, @filmRating, @dateTime);
                                    ";

                    cmd.Parameters.AddWithValue("@userId", review.userId);
                    cmd.Parameters.AddWithValue("@filmTitle", review.filmTitle);
                    cmd.Parameters.AddWithValue("@reviewBody", review.reviewBody);
                    cmd.Parameters.AddWithValue("@filmRating", review.filmRating);
                    cmd.Parameters.AddWithValue("@dateTime", review.dateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteReviewById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                DELETE FROM [review]
                                WHERE id = @id
                            ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }

}