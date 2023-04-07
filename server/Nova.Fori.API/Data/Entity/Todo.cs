using Nova.Fori.API.Models.Todo;

namespace Nova.Fori.API.Data.Entity
{
    public class Todo : Entity
    {
        public string? Description { get; set; }
        public TypeEnum Type { get; set; }
    }
}
