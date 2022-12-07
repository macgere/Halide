namespace Halide.Models
{
    public class Comment
    {
        public int? id { get; set; }
        public int? userId { get; set; }
        public int? reviewId { get; set; }
        public string? commentBody { get; set; }
        public string? dateTime { get; set; }
    }
}