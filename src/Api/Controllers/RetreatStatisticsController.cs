using Api.ContractsGeneration;
using Api.Logic;
using Api.Logic.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
[GenerateContracts]
public class RetreatStatisticsController : ControllerBase
{
    private readonly IRetreatStatisticsRepository _retreatStatisticsRepository;

    public RetreatStatisticsController(IRetreatStatisticsRepository retreatStatisticsRepository)
    {
        _retreatStatisticsRepository = retreatStatisticsRepository;
    }

    [HttpGet(Name = "List")]
    public async Task<RetreatStatistics[]> Get()
    {
        return await _retreatStatisticsRepository.ReadAllAsync();
    }

    [HttpPut(Name = "Put")]
    public async Task Put(RetreatStatistics statistics)
    {
        await _retreatStatisticsRepository.CreateAsync(statistics);
    }
}