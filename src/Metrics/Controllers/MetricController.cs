using Metrics.Services;
using Microsoft.AspNetCore.Mvc;

namespace Metrics.Controllers;

[ApiController]
[Route("[controller]")]
public class MetricController: ControllerBase
{
    
    private readonly MetricService _metricService;

    public MetricController(MetricService metricService)
    {
        _metricService = metricService;
    }

    [HttpPost("Start")]
    public void Start()
    {
        _metricService.Start();
    }

    [HttpPost("Stop")]
    public void Stop()
    {
        var result = _metricService.Stop();
        foreach (var (name, value) in result)
        {
            Console.WriteLine(name);
            Console.WriteLine(value);
        }
    }
}