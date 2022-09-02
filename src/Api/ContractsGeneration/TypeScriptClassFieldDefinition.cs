using System.Text;
using SkbKontur.TypeScript.ContractGenerator.CodeDom;

namespace Api.ContractsGeneration
{
    public class TypeScriptClassFieldDefinition : TypeScriptDefinition
    {
        public TypeScriptInterfacePropertyMember Result { get; set; }

        public bool IsPublic { get; set; }

        public bool IsStatic { get; set; }

        public TypeScriptConstructorCallExpression Constructor { get; set; }

        public override string GenerateCode(string name, ICodeGenerationContext context)
        {
            var stringBuilder = new StringBuilder();
            if(IsPublic)
                stringBuilder.Append("public ");
            if(IsStatic)
                stringBuilder.Append("static ");
            stringBuilder.AppendFormat("{0} = {1};", Result.GenerateCode(context), Constructor.GenerateCode(context));
            return stringBuilder.ToString();
        }
    }
}