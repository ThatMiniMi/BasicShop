using Microsoft.AspNetCore.Http;

namespace Backend.DTOs
{
    public class ImageDto
    {
        public IFormFile File { get; set; } = null!;
    }
}
