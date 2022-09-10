using System.Drawing;
using System.Numerics;
using System.Runtime.InteropServices;

namespace Metrics;

public static class Utils
{
    private const string dll = "user32.dll";

    [DllImport(dll)] public static extern bool GetCursorPos(out Point point);

    public static double GetDistance(Point p1, Point p2)
        => Vector2.Distance(new Vector2(p1.X, p1.Y), new Vector2(p2.X, p2.Y));
    
    [DllImport(dll)]
    public static extern short GetAsyncKeyState(VKCodes nVirtKey);

}

// https://www.pinvoke.net/default.aspx/user32.getkeystate
public enum VKCodes
{
  CONTROL = 0x11,
  ALT = 0x12,
  SHIFT = 0xA0,
}