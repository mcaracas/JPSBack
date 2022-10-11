using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class MarchamoNtNtrController : ControllerBase
{
    private readonly ILogger<MarchamoNtNtrController> _logger;
    static HttpClient client = new HttpClient();

    public MarchamoNtNtrController(ILogger<MarchamoNtNtrController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<MarchamoNtNtr> Get()
    {
        var context = new proyecto_bdContext();
        var MarchamoNtNtrs = context.MarchamoNtNtrs.ToList();
        return MarchamoNtNtrs;
    }

    [HttpGet("{id}")]
    public MarchamoNtNtr Get(int id)
    {
        var context = new proyecto_bdContext();
        var marchamoNtNtr = context.MarchamoNtNtrs.FirstOrDefault(x => x.Id == id);
        return marchamoNtNtr;
    }

    [HttpPost]
    public ActionResult Post([FromBody] MarchamoNtNtr MarchamoNtNtr)
    {
        using(var context = new proyecto_bdContext()){
            context.MarchamoNtNtrs.Add(MarchamoNtNtr);
            context.SaveChanges();
        }
        return Ok();
    }
 
    [HttpPut("{id}")]
    public void UpdateMarchamoNtNtr(MarchamoNtNtr marchamoNtNtr)
    {
        var context = new proyecto_bdContext();
        var MarchamoNtNtrUpdate = context.MarchamoNtNtrs.FirstOrDefault(x => x.Id == marchamoNtNtr.Id);
        MarchamoNtNtrUpdate.Id = marchamoNtNtr.Id;
        MarchamoNtNtrUpdate.IdSorteo = marchamoNtNtr.IdSorteo;
        MarchamoNtNtrUpdate.AperturaNt = marchamoNtNtr.AperturaNt;
        MarchamoNtNtrUpdate.CierreNt = marchamoNtNtr.CierreNt;
        MarchamoNtNtrUpdate.Contingencia1Nt = marchamoNtNtr.Contingencia1Nt;
        MarchamoNtNtrUpdate.Contingencia2Nt = marchamoNtNtr.Contingencia2Nt;
        MarchamoNtNtrUpdate.AperturaNtr = marchamoNtNtr.AperturaNtr;
        MarchamoNtNtrUpdate.CierreNtr = marchamoNtNtr.CierreNtr;
        MarchamoNtNtrUpdate.Contingencia1Ntr = marchamoNtNtr.Contingencia1Ntr;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var MarchamoNtNtrDelete = context.MarchamoNtNtrs.FirstOrDefault(x => x.Id == id);
        context.MarchamoNtNtrs.Remove(MarchamoNtNtrDelete);
        context.SaveChanges();
    }
}
