using Bogus;
using Nova.Fori.API.Data.Entity;
using Nova.Fori.API.Models.Todo;

namespace Nova.Fori.API.Core
{
    public class UserService : IUserService
    {
        public List<User> GetUsers()
        {
            Randomizer.Seed = new Random(8675309);

            var todoIds = 1;
            var testTodos = new Faker<Todo>()
                .StrictMode(true)
                .RuleFor(t => t.Id, f => todoIds++)
                .RuleFor(t => t.Description, f => f.Lorem.Sentence(3))
                .RuleFor(t => t.Type, f => f.PickRandom<TypeEnum>());

            var userIds = 1;
            var testUsers = new Faker<User>()
                .CustomInstantiator(f => new User(userIds++))
                .RuleFor(u => u.FirstName, (f, u) => f.Name.FirstName())
                .RuleFor(u => u.LastName, (f, u) => f.Name.LastName())
                .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.FirstName, u.LastName))
                .RuleFor(u => u.Todos, f => testTodos.Generate(10));

            var user = testUsers.Generate(10);

            return user.ToList();
        }
    }
}
