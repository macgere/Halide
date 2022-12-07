namespace Halide.Models
{
    public class Review
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string? reviewBody { get; set; }
        public string filmTitle { get; set; }
        public int? filmRating { get; set; }
        public string dateTime { get; set; }
/*        public List<Comment>? comments { get; set; }*/
    }
}