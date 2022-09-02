using System.Diagnostics.CodeAnalysis;
using SkbKontur.TypeScript.ContractGenerator;
using SkbKontur.TypeScript.ContractGenerator.CodeDom;
using SkbKontur.TypeScript.ContractGenerator.TypeBuilders;

namespace Api.ContractsGeneration
{
    public class WebApiAllApisBuildingContext : TypeBuildingContext
    {
        public WebApiAllApisBuildingContext(TypeScriptUnit unit, Type type)
            : base(unit, type)
        {
            this.unit = unit;
        }

        public static bool Accept(Type type)
        {
            return type == typeof(IAllApis);
        }

        public override void Initialize(ITypeGenerator typeGenerator)
        {
            var apis = ControllersGetter.GetAllControllerTypes();
            foreach(var type in apis)
            {
                typeGenerator.BuildAndImportType(unit, GetType().GetField("attributeContainer"), type);
            }

            var classDefinition = new TypeScriptClassDefinition
                {
                    ImplementedInterfaces = new TypeScriptType[]
                        {
                            new TypeScriptTypeReference("IAllApis")
                        },
                };
            classDefinition.Members.AddRange(apis.Select(x => new TypeScriptClassMemberDefinition
                {
                    Name = ControllersGetter.GetApiName(x),
                    Definition = new TypeScriptClassFieldDefinition()
                        {
                            IsPublic = true,
                            IsStatic = false,
                            Result = new TypeScriptInterfacePropertyMember(
                                ControllersGetter.GetApiName(x),
                                new TypeScriptTypeReference("I" + ControllersGetter.GetApiName(x))
                            ),
                            Constructor = new TypeScriptConstructorCallExpression(new TypeScriptConstantExpression(ControllersGetter.GetApiName(x)))
                        }
                }));

            unit.Body.Add(new TypeScriptExportStatement
                {
                    Declaration = new TypeScriptClassDeclaration
                        {
                            Name = "RealAllApis",
                            Defintion = classDefinition,
                        }
                });

            var interfaceDefinition = new TypeScriptInterfaceDefinition();
            interfaceDefinition.Members.AddRange(
                apis.Select(x => new TypeScriptInterfacePropertyMember(
                                ControllersGetter.GetApiName(x),
                                new TypeScriptTypeReference("I" + ControllersGetter.GetApiName(x))
                            )
                )
            );
            Declaration = new TypeScriptInterfaceDeclaration
                {
                    Name = "IAllApis",
                    Definition = interfaceDefinition
                };
            base.Initialize(typeGenerator);
        }

        [NotNull]
#pragma warning disable 414
        private int attributeContainer = 0;
#pragma warning restore 414

        private readonly TypeScriptUnit unit;
    }
}