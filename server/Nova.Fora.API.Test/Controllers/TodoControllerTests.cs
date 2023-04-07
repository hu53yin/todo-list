using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using Nova.Fori.API.Controllers;
using Nova.Fori.API.Core;
using Nova.Fori.API.Data.Entity;
using Nova.Fori.API.Models.Todo;

namespace Nova.Fora.API.Test.Controllers
{
    public class TodoControllerTests
    {
        private readonly TodoController _controller;
        private readonly Mock<IUserService> _userServiceMock = new Mock<IUserService>();

        public TodoControllerTests()
        {
            var users = new List<User>()
            {
                new User(1)
                {
                    Id = 1,
                    Todos = new List<Todo>()
                    {
                        new Todo()
                        {
                            Id = 1,
                            Description = "Test Todo Item",
                            Type = TypeEnum.Pending
                        }
                    }
                }
            };

            _userServiceMock.Setup(u => u.GetUsers()).Returns(users);

            var memoryCache = Mock.Of<IMemoryCache>();
            var cachEntry = Mock.Of<ICacheEntry>();

            var mockMemoryCache = Mock.Get(memoryCache);
            mockMemoryCache
                .Setup(m => m.CreateEntry(It.IsAny<object>()))
                .Returns(cachEntry);

            _controller = new TodoController(_userServiceMock.Object, mockMemoryCache.Object);
        }

        [Fact]
        public void GetUserTodoList_ReturnsOkObjectResult_WithMatchingTodoItems()
        {
            long userId = 1;

            var result = _controller.GetUserTodoList(userId);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsAssignableFrom<IEnumerable<Todo>>(okResult.Value);
            Assert.Equal("Test Todo Item", model.FirstOrDefault()?.Description);
        }

        [Fact]
        public void GetUserTodoList_ReturnsNotFoundResult_WithInvalidUserId()
        {
            long userId = 11;

            var result = _controller.GetUserTodoList(userId);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void AddTodo_ReturnsOkResult_WithValidModel()
        {
            var model = new AddTodoModel()
            {
                UserId = 1,
                Description = "New Todo Item"
            };

            var result = _controller.AddTodo(model);

            Assert.IsType<CreatedResult>(result);
        }

        [Fact]
        public void AddTodo_ReturnsNotFoundResult_WithInvalidUserId()
        {
            var model = new AddTodoModel()
            {
                UserId = 2,
                Description = "New Todo Item"
            };

            var result = _controller.AddTodo(model);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void UpdateTodoType_ReturnsOkResult_WithValidModel()
        {
            var model = new UpdateTodoTypeModel()
            {
                UserId = 1,
                TodoId = 1,
                Type = TypeEnum.Completed
            };

            var result = _controller.UpdateTodoType(model);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void UpdateTodoType_ReturnsNotFoundResult_WithInvalidUserId()
        {
            var model = new UpdateTodoTypeModel()
            {
                UserId = 3,
                TodoId = 1,
                Type = TypeEnum.Completed
            };

            var controller = new TodoController(Mock.Of<IUserService>(), Mock.Of<IMemoryCache>());
            var result = controller.UpdateTodoType(model);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void ReturnsOkResult_WithValidUserIdAndTodoId()
        {
            var user1 = new User(1)
            {
                Id = 1,
                Todos = new List<Todo>()
                {
                    new Todo() { Id = 1, Description = "Task 1", Type = TypeEnum.Pending },
                    new Todo() { Id = 2, Description = "Task 2", Type = TypeEnum.Pending }
                }
            };

            var user2 = new User(2)
            {
                Id = 2,
                Todos = new List<Todo>()
                {
                    new Todo() { Id = 1, Description = "Task 1", Type = TypeEnum.Pending },
                    new Todo() { Id = 2, Description = "Task 2", Type = TypeEnum.Pending }
                }
            };

            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(u => u.GetUsers())
                .Returns(new List<User> { user1, user2 });

            var memoryCache = Mock.Of<IMemoryCache>();
            var cachEntry = Mock.Of<ICacheEntry>();
            
            var users = new List<User> { user1, user2 };

            var mockMemoryCache = Mock.Get(memoryCache);
            mockMemoryCache
                .Setup(m => m.CreateEntry(It.IsAny<object>()))
                .Returns(cachEntry);

            var todoController = new TodoController(userServiceMock.Object, mockMemoryCache.Object);

            var model = new UpdateTodoTypeModel()
            {
                UserId = 1,
                TodoId = 1,
                Type = TypeEnum.Completed
            };

            var result = todoController.UpdateTodoType(model);

            Assert.IsType<NoContentResult>(result);
        }

    }
}
