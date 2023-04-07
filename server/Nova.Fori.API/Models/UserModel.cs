using Nova.Fori.API.Models.Todo;

namespace Nova.Fori.API.Models
{
    public class UserModel
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public List<TodoModel>? Todos { get; set; }
    }
}
