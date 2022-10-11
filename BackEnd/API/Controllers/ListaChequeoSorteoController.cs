using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class ListaChequeoSorteoController : ControllerBase
{
    private readonly ILogger<ListaChequeoSorteoController> _logger;

    public ListaChequeoSorteoController(ILogger<ListaChequeoSorteoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
        public IEnumerable<ListaChequeoSorteo> Get()
    {
        var context = new proyecto_bdContext();
        var ListaChequeoSorteos = context.ListaChequeoSorteos.ToList();
        return ListaChequeoSorteos;
    }

    [HttpGet("{id}")]
    public ListaChequeoSorteo Get(int id)
    {
        var context = new proyecto_bdContext();
        var listaChequeoSorteo = context.ListaChequeoSorteos.FirstOrDefault(x => x.Id == id);
        return listaChequeoSorteo;
    }

    [HttpPost]
    public ActionResult Post([FromBody] ListaChequeoSorteo ListaChequeoSorteo)
    {
        var context = new proyecto_bdContext();
        context.ListaChequeoSorteos.Add(ListaChequeoSorteo);
        context.SaveChanges();
        return Ok();
    }

    
    [HttpPut("{id}")]
        [HttpPut]
    public void UpdateListaChequeoSorteo(ListaChequeoSorteo listaChequeoSorteo)
    {
        var context = new proyecto_bdContext();
        var ListaChequeoSorteoUpdate = context.ListaChequeoSorteos.FirstOrDefault(x => x.Id == listaChequeoSorteo.Id);
        ListaChequeoSorteoUpdate.Id = listaChequeoSorteo.Id;
        context.SaveChanges();
    }
}