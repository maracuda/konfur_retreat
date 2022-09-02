using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using SkbKontur.TypeScript.ContractGenerator;
using SkbKontur.TypeScript.ContractGenerator.CodeDom;
using SkbKontur.TypeScript.ContractGenerator.TypeBuilders.ApiController;

namespace Api.ContractsGeneration
{
    public class WebApiTypeBuildingContext : ApiControllerTypeBuildingContextBase
    {
        public WebApiTypeBuildingContext(TypeScriptUnit unit, Type type)
            : base(unit, type)
        {
        }

        public static bool Accept(Type type)
        {
            return typeof(ControllerBase).IsAssignableFrom(type);
        }

        protected override TypeLocation GetApiBase(Type controllerType)
        {
            return new TypeLocation {Name = "ApiBase", Location = "./apiBase/ApiBase"};
        }

        public override TypeScriptType ReferenceFrom(
            TypeScriptUnit targetUnit,
            ITypeGenerator typeGenerator)
        {
            return targetUnit.AddTypeImport(Type, new TypeScriptTypeDeclaration
                {
                    Name = Declaration.Name + ", " + GetApiName(Type),
                }, this.Unit);
        }

        protected override BaseApiMethod ResolveBaseApiMethod(MethodInfo methodInfo)
        {
            if(methodInfo.GetCustomAttribute<HttpPostAttribute>() != null)
                return BaseApiMethod.Post;
            if(methodInfo.GetCustomAttribute<HttpGetAttribute>() != null)
                return BaseApiMethod.Get;
            if(methodInfo.GetCustomAttribute<HttpPutAttribute>() != null)
                return BaseApiMethod.Put;
            if(methodInfo.GetCustomAttribute<HttpDeleteAttribute>() != null)
                return BaseApiMethod.Delete;

            throw new NotSupportedException($"Can't recognize verb for {methodInfo.Name} at {methodInfo.DeclaringType?.Name}");
        }

        protected override string BuildRoute(Type controllerType, MethodInfo methodInfo)
        {
            var prefix = "";
            var prefixes = controllerType.GetCustomAttributes<RouteAttribute>()
                                         .Select(a => a.Template)
                                         .ToArray();

            var routeTemplate = GetMethodRouteTemplate(methodInfo);

            if(prefixes.Length > 1)
                throw new Exception($"Too many routePrefixAttributes for type {controllerType.FullName}");
            if(prefixes.Length == 1)
                prefix = prefixes[0];
            prefix = prefix.Trim('\\', '/');
            routeTemplate = routeTemplate.TrimStart('\\', '/');

            var route = !string.IsNullOrEmpty(prefix) && !string.IsNullOrEmpty(routeTemplate) ? prefix + "/" + routeTemplate : prefix + routeTemplate;


            return CutConstraints(route)
                   .Replace("{shopId}", "{ApiBase.shopId}")
                   .Replace("{departmentId}", "{ApiBase.departmentId}")
                   .Replace("{organizationId}", "{ApiBase.organizationId}");
        }

        private string GetMethodRouteTemplate(MethodInfo methodInfo)
        {
            var routeAttribute = methodInfo.GetCustomAttribute<RouteAttribute>();
            if(routeAttribute != null)
                return routeAttribute.Template;

            var methodAttribute = methodInfo.GetCustomAttribute<HttpPostAttribute>()
                                  ?? methodInfo.GetCustomAttribute<HttpGetAttribute>()
                                  ?? methodInfo.GetCustomAttribute<HttpPutAttribute>()
                                  ?? (HttpMethodAttribute)methodInfo.GetCustomAttribute<HttpDeleteAttribute>();
            if(methodAttribute != null)
                return methodAttribute.Template ?? "";

            throw new NotSupportedException($"Can't resolve route for {methodInfo.Name} at {methodInfo.DeclaringType?.Name}");
        }

        private string CutConstraints(string template)
        {
            var result = new StringBuilder();
            var insideParameter = false;
            var insideConstraints = false;
            foreach(var c in template)
            {
                if(c == '{')
                {
                    result.Append(c);
                    insideParameter = true;
                }
                else if(c == '}')
                {
                    result.Append(c);
                    insideConstraints = false;
                    insideParameter = false;
                }
                else if(c == ':' && insideParameter)
                {
                    insideConstraints = true;
                }
                else
                {
                    if(!insideConstraints)
                        result.Append(c);
                }
            }

            return result.ToString();
        }

        protected override ParameterInfo[] GetQueryParameters(ParameterInfo[] parameters, Type controllerType)
        {
            var baseApiMethod = GetBaseApiMethod(parameters);

            return IsApiMethodCanHaveBody(baseApiMethod) ? parameters.Where(x => x.GetCustomAttribute<FromQueryAttribute>() != null).ToArray() : parameters.Where(x => x.GetCustomAttribute<FromBodyAttribute>() == null).ToArray();
        }

        protected override ParameterInfo GetBody(ParameterInfo[] parameters, Type controllerType)
        {
            return parameters.SingleOrDefault(x => x.GetCustomAttribute<FromBodyAttribute>() != null);
        }

        protected override TypeScriptExpression GenerateCustomBody(MethodInfo methodInfo, string methodName, Type controllerType)
        {
            var baseApiMethod = ResolveBaseApiMethod(methodInfo);

            // If api method can't have body or we find parameter that marked [FromBody] attribute
            // Then generate common body for object
            if(!IsApiMethodCanHaveBody(baseApiMethod) || GetBody(methodInfo.GetParameters(), controllerType) != null)
                return null;

            var routeTemplate = BuildRoute(controllerType, methodInfo);
            var parameters = methodInfo.GetParameters().Where(c => c.GetCustomAttribute<FromQueryAttribute>() == null).ToArray();
            parameters = parameters.Where(c => !routeTemplate.Contains("{" + c.Name + "}")).ToArray();

            // If we haven't parameters or all parameters marked from uri
            // Generate common body
            if(!parameters.Any())
                return null;

            if(parameters.Length == 1 && parameters.First().ParameterType.IsArray)
                return new TypeScriptVariableReference(parameters.First().Name);

            var body = parameters.Select<ParameterInfo, TypeScriptObjectLiteralInitializer>(
                c => new TypeScriptObjectLiteralProperty(
                    new TypeScriptStringLiteral(c.Name),
                    new TypeScriptVariableReference(c.Name)
                )).ToArray();

            return new TypeScriptObjectLiteral(
                body
            );
        }

        protected override MethodInfo[] GetMethodsToImplement(Type controllerType)
        {
            return controllerType
                   .GetMethods(BindingFlags.Instance | BindingFlags.Public)
                   .Where(m => !m.IsSpecialName)
                   .Where(x => x.DeclaringType == controllerType)
                   .ToArray();
        }

        protected override Type ResolveReturnType(Type type)
        {
            type = base.ResolveReturnType(type);
            if(type == typeof(ActionResult))
                return typeof(void);
            if(type.IsGenericType && type.GetGenericTypeDefinition() == typeof(ActionResult<>))
                return ResolveReturnType(type.GetGenericArguments()[0]);
            return type;
        }

        private BaseApiMethod GetBaseApiMethod(ParameterInfo[] parameters)
        {
            if(parameters.FirstOrDefault()?.Member is MethodInfo methodInfo)
            {
                return ResolveBaseApiMethod(methodInfo);
            }

            return BaseApiMethod.Get;
        }

        private bool IsApiMethodCanHaveBody(BaseApiMethod baseApiMethod)
        {
            switch(baseApiMethod)
            {
            case BaseApiMethod.Post:
            case BaseApiMethod.Put:
                return true;
            default:
                return false;
            }
        }
    }
}