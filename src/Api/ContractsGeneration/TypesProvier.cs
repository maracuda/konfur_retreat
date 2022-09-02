using System.Globalization;
using Api.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Api.ContractsGeneration;

public static class ControllersGetter
{
    public static Type[] GetAllControllerTypes(params Type[] types)
    {
        return typeof(RetreatStatisticsController)
            .Assembly
            .GetTypes()
            .Where(x => x.BaseType == typeof(ControllerBase))
            .ToArray();
    }

    public static string GetApiName(Type controllerType)
    {
        var typeName = controllerType.Name;
        if(typeName.EndsWith(controllerVerb, true, CultureInfo.CurrentCulture))
            return $"{typeName.Substring(0, typeName.Length - controllerVerb.Length)}Api";
        throw new ArgumentException(@"Controller should end with 'Controllers'", typeName);
    }

    private const string controllerVerb = "Controller";
}
