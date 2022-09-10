namespace Metrics.Services;

public class HotKeys: IMetricCalculator
{
    public string Name => nameof(HotKeys);
    public double Current { get; private set; }

    private CancellationTokenSource _cancellationTokenSource;
    public void Start()
    {
        Current = 0;
        _cancellationTokenSource = new CancellationTokenSource();
        var token = _cancellationTokenSource.Token;
        Task.Run(() =>
        {
            while (!token.IsCancellationRequested)
            {
                // https://cplusplus.com/forum/general/128459/#:~:text=GetAsyncKeyState%20returns%20a%2016%2Dbit,the%20key%20is%20first%20pressed).
                var isAlt = (Utils.GetAsyncKeyState(VKCodes.ALT) & 0x0001) == 1;
                var isCtrl = (Utils.GetAsyncKeyState(VKCodes.CONTROL) & 0x0001) == 1;
                var isShift = (Utils.GetAsyncKeyState(VKCodes.SHIFT) & 0x0001) == 1;
                if (isAlt || isShift || isCtrl)
                    Current += 1;
            }
        }, token);
    }

    public double Stop()
    {
        _cancellationTokenSource.Cancel();
        return Current;
    }
}