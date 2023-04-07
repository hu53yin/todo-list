namespace Nova.Fori.API.Models.Todo
{
    public class UpdateTodoTypeModel
    {
        public long UserId { get; set; }
        public long TodoId { get; set; }
        public TypeEnum Type { get; set; }
    }
}
