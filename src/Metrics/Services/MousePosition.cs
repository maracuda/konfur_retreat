namespace Metrics.Services;

public class MousePosition: IMetricCalculator
{
    public string Name => nameof(MousePosition);

    public double Current { get; private set; }

    private CancellationTokenSource _cancellationTokenSource;
    
    public void Start()
    {
        Current = 0;
        _cancellationTokenSource = new CancellationTokenSource();
        var token = _cancellationTokenSource.Token;
        Task.Run(() =>
        {
            Utils.GetCursorPos(out var currentPosition);
            while (!token.IsCancellationRequested)
            {
                Utils.GetCursorPos(out var newPosition);
                Current += Utils.GetDistance(currentPosition, newPosition);
                currentPosition = newPosition;
            }
        }, token);
        
    }
    
    

    public double Stop()
    {
        _cancellationTokenSource.Cancel();
        return Current;
    }
}