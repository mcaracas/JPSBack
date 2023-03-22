#nullable disable
//RF08 Verificar resultados Lotería Física
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VerificarResultadosLFController : ControllerBase
    {
        private readonly ILogger<VerificarResultadosLFController> _logger;

        public VerificarResultadosLFController(ILogger<VerificarResultadosLFController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public Resultado Get(int id)
        {
            ConexionSybase conexion = new ConexionSybase();
            Resultado datos = conexion.GetResultadoSybase(id);
            return datos;
        }

        [HttpPost]
        public ActionResult Post([FromBody] List<Resultado> Resultados)
        {
        var context = new proyecto_bdContext();
        context.Resultados.AddRange(Resultados);
        context.SaveChanges();
        return Ok();
        }
    }

    //se ocupa post
    
}