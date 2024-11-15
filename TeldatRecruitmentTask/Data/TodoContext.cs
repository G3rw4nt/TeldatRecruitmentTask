using System;
using Microsoft.EntityFrameworkCore;
using TeldatRecruitmentTask.Models;

namespace TeldatRecruitmentTask.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}

