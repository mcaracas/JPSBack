using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]

public class UtilController : ControllerBase
{
    private readonly ILogger<UtilController> _logger;

    public UtilController(ILogger<UtilController> logger)
    {
        _logger = logger;
    }

    [HttpGet("FechaHoraActual")]
    public DateTime GetFechaHoraActual()
    {
        return DateTime.Now;
    }
}