using Api.Logic.Models;

namespace Api.Logic;

public interface IRetreatStatisticsRepository
{
    Task<RetreatStatistics[]> ReadAllAsync();
    Task CreateAsync(RetreatStatistics statistics);
}