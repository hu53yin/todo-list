using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Nova.Fori.API.Core;
using Nova.Fori.API.Data.Entity;
using Nova.Fori.API.Models.Todo;

namespace Nova.Fori.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class TodoController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMemoryCache _memoryCache;
        private readonly List<User>? _users;
        private readonly MemoryCacheEntryOptions _cacheEntryOptions;

        public TodoController(IUserService userService, IMemoryCache cache)
        {
            _userService = userService;
            _memoryCache = cache;

            _cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromDays(1));

            if (!_memoryCache.TryGetValue("UserList", out _users))
            {
                _users = _userService.GetUsers();

                if(_users != null) 
                {
                    _memoryCache.Set("UserList", _users, _cacheEntryOptions);
                }
            }
        }

        [HttpGet("user/{userId}")]
        public ActionResult<List<TodoModel>> GetUserTodoList(long userId)
        {
            try
            {
                if (_users != null)
                {
                    var todoList = _users!.Where(u => u.Id == userId).Select(u => u.Todos);

                    if (todoList.Count() > 0)
                    {
                        return Ok(todoList.FirstOrDefault());
                    }

                    return NotFound();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult AddTodo([FromBody] AddTodoModel todo)
        {
            try
            {
                if (_users != null)
                {
                    Todo? todoItem;
                    var todoList = _users!.Where(u => u.Id == todo.UserId).Select(u => u.Todos).FirstOrDefault();

                    if (todoList != null)
                    {
                        var lastId = todoList.LastOrDefault()!.Id;

                        todoItem = new Todo
                        {
                            Id = ++lastId,
                            Description = todo.Description,
                            Type = TypeEnum.Pending
                        };

                        todoList.Add(todoItem);

                        _memoryCache.Set("UserList", _users, _cacheEntryOptions);
                    }
                    else
                    {
                        return NotFound();
                    }

                    return Created(string.Format("/api/Todo/user/{0}", todo.UserId), todoItem);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut()]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult UpdateTodoType([FromBody] UpdateTodoTypeModel todo)
        {
            try
            {
                if(_users != null)
                {
                    var todoList = _users!.Where(u => u.Id == todo.UserId).Select(u => u.Todos).FirstOrDefault();

                    if (todoList != null)
                    {
                        var todoItem = todoList.Where(t => t.Id == todo.TodoId).FirstOrDefault();

                        if (todoItem != null)
                        {
                            todoItem.Type = todo.Type;

                            _memoryCache.Set("UserList", _users, _cacheEntryOptions);
                        }
                    }
                    else
                    {
                        return NotFound();
                    }
                    
                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
