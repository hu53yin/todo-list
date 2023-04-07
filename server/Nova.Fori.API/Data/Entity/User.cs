namespace Nova.Fori.API.Data.Entity
{
    public class User : Entity
    {
        public User(long userId) 
        { 
            this.Id = userId;
        }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public List<Todo>? Todos { get; set; }
    }
}
