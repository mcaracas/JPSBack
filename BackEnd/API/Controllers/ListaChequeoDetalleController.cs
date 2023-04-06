using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class ListaChequeoDetalleController : ControllerBase
{
    private readonly ILogger<ListaChequeoDetalleController> _logger;

    public ListaChequeoDetalleController(ILogger<ListaChequeoDetalleController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<ListaChequeoDetalle> Get()
    {
        var context = new proyecto_bdContext();
        var ListaChequeoDetalles = context.ListaChequeoDetalles.ToList();
        return ListaChequeoDetalles;
    }

    [HttpGet("{id}")]
    public ListaChequeoDetalle Get(int id)
    {
        var context = new proyecto_bdContext();
        var ListaChequeoDetalle = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == id);
        return ListaChequeoDetalle;
    }

    [HttpPost]
    public ActionResult Post([FromBody] ListaChequeoDetalle ListaChequeoDetalle)
    {
        var context = new proyecto_bdContext();
        context.ListaChequeoDetalles.Add(ListaChequeoDetalle);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdateListaChequeoSorteo(ListaChequeoDetalle ListaChequeoDetalle)
    {
        var context = new proyecto_bdContext();
        var ListaChequeoDetalleUpdate = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == ListaChequeoDetalle.Id);
        ListaChequeoDetalleUpdate.Id = ListaChequeoDetalle.Id;
        ListaChequeoDetalleUpdate.Descripcion= ListaChequeoDetalle.Descripcion;
        ListaChequeoDetalleUpdate.TipoLoteria = ListaChequeoDetalle.TipoLoteria;
        ListaChequeoDetalleUpdate.TipoListaChequeo = ListaChequeoDetalle.TipoListaChequeo;
        ListaChequeoDetalleUpdate.Orden = ListaChequeoDetalle.Orden;
        context.SaveChanges();
    }


    [HttpDelete("{id}")]    
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var ListaChequeoDetalle = context.ListaChequeoDetalles.FirstOrDefault(x => x.Id == id);
        context.ListaChequeoDetalles.Remove(ListaChequeoDetalle);
        context.SaveChanges();
    }

    [HttpGet("ListaChequeoParaSorteo/{idSorteo}")]
    public IActionResult GetListaChequeoParaSorteo(int idSorteo)
    {
        var context = new proyecto_bdContext();
        var DatosSorteo= context.DatosSorteos.FirstOrDefault(x => x.IdInterno == idSorteo);
        var ProcedimientosPrevios = context.ListaChequeoDetalles.Where(x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo=="previo").OrderBy(x => x.Orden).ToList();
        var ProcedimientosDurante = context.ListaChequeoDetalles.Where(x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo=="durante").OrderBy(x => x.Orden).ToList();
        var ProcedimientosPosteriores = context.ListaChequeoDetalles.Where(x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo=="posterior").OrderBy(x => x.Orden).ToList();
        var ProcedimientosSolicitud = context.ListaChequeoDetalles.Where(x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo=="solicitud").OrderBy(x => x.Orden).ToList();
        var ProcedimientosGeneracion = context.ListaChequeoDetalles.Where(x => x.TipoLoteria == DatosSorteo.TipoLoteria && x.TipoListaChequeo=="generacion").OrderBy(x => x.Orden).ToList();

        var ListaChequeoDetallesParaSorteo=new
        {
            ProcedimientosPrevios,
            ProcedimientosDurante,
            ProcedimientosPosteriores,
            ProcedimientosSolicitud,
            ProcedimientosGeneracion
        };

        return Ok(ListaChequeoDetallesParaSorteo);
    }


}