namespace Metrics.Services;

public class MetricService
{
    private readonly IEnumerable<IMetricCalculator> metricCalculators;

    public MetricService(IEnumerable<IMetricCalculator> metricCalculators)
    {
        this.metricCalculators = metricCalculators;
    }

    public void Start()
    {
        foreach (var metricCalculator in metricCalculators)
        {
            metricCalculator.Start();
        }
    }

    public MetricResult[] Stop()
    {
        return metricCalculators
            .Select(x => new MetricResult(x.Name, x.Stop()))
            .ToArray();
    }
}