using System;
using System.IO;
using Api.ContractsGeneration;
using NUnit.Framework;
using SkbKontur.TypeScript.ContractGenerator.CodeDom;

namespace Generator;

public class ContractsGeneratorRunner
{
    [Test]
    public void Run()
    {
        var typeScriptCodeGenerator = new ContractsGeneratorFactory().Create();

        var targetPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "src", "front",
            "contracts");
        
        typeScriptCodeGenerator.GenerateFiles(targetPath, JavaScriptTypeChecker.TypeScript);
    }
}