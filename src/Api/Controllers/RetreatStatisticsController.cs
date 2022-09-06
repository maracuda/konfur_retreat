using Api.ContractsGeneration;
using Api.Logic;
using Api.Logic.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("stats")]
[GenerateContracts]
public class RetreatStatisticsController : ControllerBase
{
    private readonly IRetreatStatisticsRepository _retreatStatisticsRepository;

    public RetreatStatisticsController(IRetreatStatisticsRepository retreatStatisticsRepository)
    {
        _retreatStatisticsRepository = retreatStatisticsRepository;
    }

    [HttpGet("list")]
    public async Task<RetreatStatistics[]> List()
    {
        return await _retreatStatisticsRepository.ReadAllAsync();
    }

    [HttpPut("create")]
    public async Task Create(RetreatStatistics statistics)
    {
        await _retreatStatisticsRepository.CreateAsync(statistics);
    }
}