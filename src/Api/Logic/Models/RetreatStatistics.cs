namespace Api.Logic.Models;

public class RetreatStatistics
{
    public Guid Id { get; set; }
    public string PlayerOneName { get; set; }
    public string PlayerTwoName { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public long MouseDistance { get; set; }
    public long ClicksCount { get; set; }
    public long ShortCutsCount { get; set; }
}