#nullable disable
//RF07 Verificar monto de acumulados
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VerificarAcumGtecController : ControllerBase
    {
        private readonly ILogger<VerificarAcumGtecController> _logger;

        public VerificarAcumGtecController(ILogger<VerificarAcumGtecController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public AcumGtec Get(int id)
        {
            ConexionSybase conexion = new ConexionSybase();
            AcumGtec datos = conexion.GetAcumulado(id);
            return datos;
        }
    }
}