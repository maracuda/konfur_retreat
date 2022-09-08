using System.Text.Json;
using Api.Logic.Models;
using Vostok.Logging.Abstractions;
using Vostok.Telemetry.Kontur;

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
        
        var log = KonturHerculesLogProvider.Get()
            .WithProperties(new Dictionary<string, object>
            {
                ["elk-index"] = "alko-product-services-staging",
                ["environment"] = "konfur",
                ["application"] = "retreatApp"
            })
            .WithMinimumLevel(Vostok.Logging.Abstractions.LogLevel.Info);
  
        log.Warn("Players are {first} {second}", Guid.NewGuid().ToString(), Guid.NewGuid().ToString());
    }
}