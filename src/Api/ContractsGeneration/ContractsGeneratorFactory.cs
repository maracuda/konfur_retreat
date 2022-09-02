using System.Globalization;
using System.Text.RegularExpressions;
using Api.Controllers;
using SkbKontur.TypeScript.ContractGenerator;
using SkbKontur.TypeScript.ContractGenerator.TypeBuilders;

namespace Api.ContractsGeneration;

public class ContractsGeneratorFactory
{
    public TypeScriptGenerator Create()
    {
        var types = ControllersGetter.GetAllControllerTypes(
                typeof(RetreatStatisticsController)
            )
            .Append(typeof(IAllApis))
            .ToArray();


        return new TypeScriptGenerator(
            new TypeScriptGenerationOptions
            {
                EnableExplicitNullability = true,
                EnableOptionalProperties = false,
                EnumGenerationMode = EnumGenerationMode.TypeScriptEnum,
                UseGlobalNullable = true
            },
            CreateCustomTypeGeneratorForWebApi(),
            new RootTypesProvider(types));
    }

    private static CustomTypeGenerator CreateCustomTypeGeneratorForWebApi()
    {
        return new CustomTypeGenerator()
                .WithTypeLocationRule(
                    IsController,
                    type => "api\\" /*+ TruncateNamespacePrefix(type, "Kontur.Market.Web.Api.Controllers")*/ +
                            ControllersGetter.GetApiName(type))
                .WithTypeLocationRule(
                    type => type == typeof(IAllApis),
                    type => @"api\AllApis"
                )
                .WithTypeLocationRule(
                    type => true,
                    GetTypeName
                )
                .WithTypeBuildingContext(WebApiAllApisBuildingContext.Accept,
                    (unit, type) => new WebApiAllApisBuildingContext(unit, type))
                .WithTypeBuildingContext(WebApiTypeBuildingContext.Accept,
                    (unit, type) => new WebApiTypeBuildingContext(unit, type))
                .WithTypeBuildingContext(DictionaryTypeBuildingContext.Accept,
                    (unit, type) => new DictionaryTypeBuildingContext(type))
                .WithTypeRedirect<Guid>("Guid", @"..\domain\dataTypes\Guid")
                .WithTypeRedirect<DateTime>("DateTime", @"..\domain\dataTypes\DateTime")
                .WithTypeRedirect<DateTimeOffset>("DateTime", @"..\domain\dataTypes\DateTime")
            ;
    }

    private static bool IsController(Type type)
    {
        return GetTypeName(type).EndsWith("Controller", true, CultureInfo.CurrentCulture);
    }

    private static string GetTypeName(Type type)
    {
        return type.IsGenericType ? new Regex("`.*$").Replace(type.Name, "") : type.Name;
    }
}