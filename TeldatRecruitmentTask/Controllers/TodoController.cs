using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeldatRecruitmentTask.Data;
using TeldatRecruitmentTask.Models;

namespace TeldatRecruitmentTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoItems), new { id = todoItem.Id }, todoItem);
        }
    }
}

