using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
#nullable disable

public class MarchamoLottoController : ControllerBase
{

    private readonly ILogger<MarchamoLottoController> _logger;

    public MarchamoLottoController(ILogger<MarchamoLottoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<MarchamoLotto> Get()
    {
        var context = new proyecto_bdContext();
        var MarchamoLottos = context.MarchamoLottos.ToList();
        return MarchamoLottos;
    }

    [HttpGet("{id}")]
    public MarchamoLotto Get(int id)
    {
        var context = new proyecto_bdContext();
        var marchamoLotto = context.MarchamoLottos.FirstOrDefault(x => x.Id == id);
        return marchamoLotto;
    }

    [HttpPost]
    public ActionResult Post([FromBody] MarchamoLotto MarchamoLotto)
    {
        var context = new proyecto_bdContext();
        context.MarchamoLottos.Add(MarchamoLotto);
        context.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    public void UpdateMarchamoLotto(MarchamoLotto marchamoLotto)
    {
        var context = new proyecto_bdContext();
        var MarchamoLottoUpdate = context.MarchamoLottos.FirstOrDefault(x => x.Id == marchamoLotto.Id);
        MarchamoLottoUpdate.Id = marchamoLotto.Id;
        MarchamoLottoUpdate.IdSorteo = marchamoLotto.IdSorteo;
        MarchamoLottoUpdate.Apertura = marchamoLotto.Apertura;
        MarchamoLottoUpdate.Cierre = marchamoLotto.Cierre;
        MarchamoLottoUpdate.Contingencia = marchamoLotto.Contingencia;
        context.SaveChanges();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var context = new proyecto_bdContext();
        var marchamoLotto = context.MarchamoLottos.FirstOrDefault(x => x.Id == id);
        context.MarchamoLottos.Remove(marchamoLotto);
        context.SaveChanges();
    }
}