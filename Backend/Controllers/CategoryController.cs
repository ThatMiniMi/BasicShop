using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly AppDbContext _context;
    public CategoryController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        var categories = await _context.Categories.Include(c => c.Products).ToListAsync();
        if (categories == null)
        {
            return NoContent();
        }
        return categories;
    }

    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(Category category)
    {
        if (category == null || string.IsNullOrEmpty(category.Name))
        {
            return BadRequest("Category is null or invalid.");
        }

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCategories), new { id = category.Id}, category);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, Category category)
    {
        if (category == null || id != category.Id)
        {
            return BadRequest("Invalid category data or mismatched ID.");
        }
            
        _context.Entry(category).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Categories.Any( c => c.Id == id))
                return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            return NotFound();

        var hasRelatedProducts = await _context.Products.AnyAsync(p => p.CategoryID == id);
        if (hasRelatedProducts)
        {
            return BadRequest("Cannot delete category with related products.");
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}