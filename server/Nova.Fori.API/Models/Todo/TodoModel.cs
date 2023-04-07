namespace Nova.Fori.API.Models.Todo
{
    public class TodoModel
    {
        public long Id { get; set; }
        public string? Description { get; set; }
        public TypeEnum Type { get; set; }
    }
}
