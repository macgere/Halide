using Halide.Interfaces;
using Halide.Models;
using System.Data.SqlClient;

namespace Halide.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public UserRepository(IConfiguration config)
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
        public User GetUserById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [user]
                                WHERE id = @id
                            ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        if (reader.Read())
                        {
                            User user = new User()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("id")),
                                name = reader.GetString(reader.GetOrdinal("name")),
                                email = reader.GetString(reader.GetOrdinal("email")),
                                password = reader.GetString(reader.GetOrdinal("password")),
                                imageUrl = reader.GetString(reader.GetOrdinal("imageUrl"))
                            };

                            return user;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public int GetUserByEmailAndPassword(string email, string password)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [user]
                                WHERE email = @email
                                AND password = @password
                            ";
                    cmd.Parameters.AddWithValue("@email", email);
                    cmd.Parameters.AddWithValue("@password", password);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        if (reader.Read())
                        {
                            /*User user = new User()
                            {*/
                            return reader.GetInt32(reader.GetOrdinal("id"));
/*                                name = reader.GetString(reader.GetOrdinal("name")),
                                email = reader.GetString(reader.GetOrdinal("email")),
                                password = reader.GetString(reader.GetOrdinal("password")),
                                imageUrl = reader.GetString(reader.GetOrdinal("imageUrl"))*/
/*                            };*/
/*
                            return user;*/
                        }
                        else
                        {
                            return 0;
                        }
                    }
                }
            }
        }
        public List<Review> GetReviewsByUserId(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT *
                                FROM [review] i
                                JOIN [user] f
                                ON f.id = i.userId
                                WHERE userId = @id
                            ";
                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Review> items = new List<Review>();
                        while (reader.Read())
                        {
                            Review review = new Review()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("id")),
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                reviewBody = reader.GetString(reader.GetOrdinal("reviewBody")),
                                filmTitle = reader.GetString(reader.GetOrdinal("filmTitle")),
                                filmRating = reader.GetInt32(reader.GetOrdinal("filmRating")),
                                dateTime = reader.GetString(reader.GetOrdinal("dateTime"))
                            };
                            items.Add(review);
                        }
                        return items;
                    }
                }
            }
        }


        public void CreateUser(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO [user](name, imageUrl, email, password)
                                        VALUES(@name, @imageUrl, @email, @password);
                                    ";

                    cmd.Parameters.AddWithValue("@name", user.name);
                    cmd.Parameters.AddWithValue("@imageUrl", user.imageUrl);
                    cmd.Parameters.AddWithValue("@email", user.email);
                    cmd.Parameters.AddWithValue("@password", user.password);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}