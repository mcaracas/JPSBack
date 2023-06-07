using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListaChequeoDetalleController : ControllerBase
    {
        private readonly ILogger<ListaChequeoDetalleController> _logger;

        public ListaChequeoDetalleController(ILogger<ListaChequeoDetalleController> logger)
        {
            _logger = logger;
        }

        [HttpGet("ListaChequeoParaSorteo/{idSorteo}")]
        public IActionResult GetListaChequeoParaSorteo(int idSorteo)
        {
            var context = new proyecto_bdContext();
            var DatosSorteo = context.DatosSorteos.FirstOrDefault(x => x.IdInterno == idSorteo);

            var DatosPreviosId = context.DatosPreviosAdministracions
                .FirstOrDefault(x => x.IdDatoSorteo == DatosSorteo.IdInterno)
                .Id;

            var GerenteGeneral = context.Representantes
                .FirstOrDefault(x => x.IdDatosPrevios == DatosPreviosId)
                .Gerencia;

            var GerenteOperaciones = context.Representantes
                .FirstOrDefault(x => x.IdDatosPrevios == DatosPreviosId)
                .GerenteOperaciones;

            var GerenteProduccion = context.Representantes
                .FirstOrDefault(x => x.IdDatosPrevios == DatosPreviosId)
                .GerenteProduccion;

            var ProcedimientosPrevios = context.ListaChequeoDetalles
                .Where(
                    x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo == "previo"
                )
                .OrderBy(x => x.Orden)
                .ToList();
            ProcedimientosPrevios[0].Descripcion = ProcedimientosPrevios[0].Descripcion.Replace(
                "{GerenteGeneral}",
                GerenteGeneral
            );

            ProcedimientosPrevios[1].Descripcion = ProcedimientosPrevios[1].Descripcion.Replace(
                "{GerenteOperaciones}",
                GerenteOperaciones
            );

            ProcedimientosPrevios[2].Descripcion = ProcedimientosPrevios[2].Descripcion.Replace(
                "{GerenteProduccion}",
                GerenteProduccion
            );

            ProcedimientosPrevios[3].Descripcion = ProcedimientosPrevios[3].Descripcion.Replace(
                "{Otro}",
                ""
            );

            ProcedimientosPrevios[3].Descripcion = ProcedimientosPrevios[3].Descripcion.Replace(
                "{OtroDescripcion}",
                "________________________"
            );

            var ProcedimientosDurante = context.ListaChequeoDetalles
                .Where(
                    x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo == "durante"
                )
                .OrderBy(x => x.Orden)
                .ToList();

            var ProcedimientosPosteriores = context.ListaChequeoDetalles
                .Where(
                    x =>
                        x.TipoLoteria == DatosSorteo.TipoLoteria
                        && x.TipoListaChequeo == "posterior"
                )
                .OrderBy(x => x.Orden)
                .ToList();

            var ProcedimientosSolicitud = context.ListaChequeoDetalles
                .Where(
                    x =>
                        x.TipoLoteria == DatosSorteo.TipoLoteria
                        && x.TipoListaChequeo == "solicitud"
                )
                .OrderBy(x => x.Orden)
                .ToList();
            var ProcedimientosGeneracion = context.ListaChequeoDetalles
                .Where(
                    x =>
                        x.TipoLoteria == DatosSorteo.TipoLoteria
                        && x.TipoListaChequeo == "generacion"
                )
                .OrderBy(x => x.Orden)
                .ToList();

            var ListaChequeoDetallesParaSorteo = new
            {
                ProcedimientosPrevios,
                ProcedimientosDurante,
                ProcedimientosPosteriores,
                ProcedimientosSolicitud,
                ProcedimientosGeneracion
            };

            return Ok(ListaChequeoDetallesParaSorteo);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ListaChequeoDetalle ListaChequeoDetalle)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                context.ListaChequeoDetalles.Add(ListaChequeoDetalle);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el detalle de la lista de chequeo: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ListaChequeoDetalle ListaChequeoDetalle)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var context = new proyecto_bdContext();
                var existingDetalle = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == id);
                if (existingDetalle == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }

                existingDetalle.Id = ListaChequeoDetalle.Id;
                existingDetalle.Descripcion = ListaChequeoDetalle.Descripcion;
                existingDetalle.TipoLoteria = ListaChequeoDetalle.TipoLoteria;
                existingDetalle.TipoListaChequeo = ListaChequeoDetalle.TipoListaChequeo;
                existingDetalle.Orden = ListaChequeoDetalle.Orden;
                context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    $"Error al actualizar el detalle de la lista de chequeo con id: {id}: {ex.Message}"
                );
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var context = new proyecto_bdContext();
                var ListaChequeoDetalle = context.ListaChequeoDetalles.FirstOrDefault(
                    x => x.Id == id
                );
                if (ListaChequeoDetalle == null)
                {
                    return NotFound($"No existen datos con el ID: {id}:");
                }
                context.ListaChequeoDetalles.Remove(ListaChequeoDetalle);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    $"Error al eliminar el detalle de la lista de chequeo con id: {id}: {ex.Message}"
                );
                return StatusCode(500);
            }
        }
    }
}
