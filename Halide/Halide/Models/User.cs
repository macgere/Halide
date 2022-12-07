namespace Halide.Models
{
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string? imageUrl { get; set; }

/*        public List<Review>? reviews { get; set; }*/
    }
}