using System.Text.Json;
using Api.Logic.Models;

namespace Api.Logic;

public class RetreatStatisticsRepository : IRetreatStatisticsRepository
{
    public async Task<RetreatStatistics[]> ReadAllAsync()
    {
        var text = await File.ReadAllTextAsync("db.json");

        return JsonSerializer.Deserialize<RetreatStatistics[]>(text) ?? Array.Empty<RetreatStatistics>();
    }

    public async Task CreateAsync(RetreatStatistics statistics)
    {
        var allStats = await ReadAllAsync();
        var newStats = allStats.Append(statistics);

        await File.WriteAllTextAsync("db.json", JsonSerializer.Serialize(newStats));
    }
}