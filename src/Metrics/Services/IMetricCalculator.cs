namespace Metrics.Services;

public interface IMetricCalculator
{
    public string Name { get; }

    public void Start();
    public double Stop();
}