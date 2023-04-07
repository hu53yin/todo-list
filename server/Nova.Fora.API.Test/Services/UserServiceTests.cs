using Nova.Fori.API.Core;

namespace Nova.Fora.API.Test.Services
{
    public class UserServiceTests
    {
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _userService = new UserService();
        }

        [Fact]
        public void GetUsers_ReturnsListWithTenUsers()
        {
            var users = _userService.GetUsers();

            Assert.Equal(10, users.Count);
        }

        [Fact]
        public void GetUsers_ReturnsListWithTenTodosForEachUser()
        {
            var users = _userService.GetUsers();

            Assert.All(users, user => Assert.Equal(10, user.Todos!.Count()));
        }
    }
}
