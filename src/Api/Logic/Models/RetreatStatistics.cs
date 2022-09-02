namespace Api.Logic.Models;

public class RetreatStatistics
{
    public Guid Id { get; set; }
    public string PlayerOneName { get; set; }
    public string PlayerTwoName { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public int MouseDistance { get; set; }
    public int ClicksCount { get; set; }
    public int ShortCutsCount { get; set; }
}