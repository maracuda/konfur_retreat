using Metrics.Services;
using Microsoft.AspNetCore.Mvc;
using Vostok.Logging.Abstractions;

namespace Metrics.Controllers;

[ApiController]
[Route("metrics")]
public class MetricController : ControllerBase
{
    private readonly ILog _log;
    private readonly MetricService _metricService;

    public MetricController(MetricService metricService,
        ILog log)
    {
        _metricService = metricService;
        _log = log;
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
        
        foreach (var (name, value) in result)
        {
            _log.Warn($"{name} {{value}}", value);
        }
    }
}