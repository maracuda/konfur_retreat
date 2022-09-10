namespace Metrics.Services;

public class Time: IMetricCalculator
{
    public string Name => nameof(Time);
    private DateTime StartTime;
    public void Start() => StartTime = DateTime.Now;
    public double Stop() => (DateTime.Now - StartTime).TotalMinutes;
}