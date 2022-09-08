using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using Api.ContractsGeneration;
using NUnit.Framework;
using SkbKontur.TypeScript.ContractGenerator.CodeDom;
using Vostok.Logging.Abstractions;
using Vostok.Logging.Console;
using Vostok.Logging.Hercules;
using Vostok.Telemetry.Kontur;

namespace Generator;

public class ContractsGeneratorRunner
{
    [Test]
    public void Run()
    {
        var typeScriptCodeGenerator = new ContractsGeneratorFactory().Create();

        var targetPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "front",
            "contracts");
        
        typeScriptCodeGenerator.GenerateFiles(targetPath, JavaScriptTypeChecker.TypeScript);
    }

    [Test]
    public void SendMetric()
    {
        var diagnosticLog = new SynchronousConsoleLog();
  
        var herculesLog = KonturHerculesLogProvider.Get(diagnosticLog)
            .WithProperties(new Dictionary<string, object>
            {
                ["project"] = "alko",
                ["environment"] = "staging",
                ["application"] = "retreatApp",
                [WellKnownHerculesLogProperties.ElkIndex] = "alko-products-services-staging"
            })
            .WithMinimumLevel(Vostok.Logging.Abstractions.LogLevel.Warn);
  
        herculesLog.Warn("Test info.");
        herculesLog.Error("Test error.");
        
        Thread.Sleep(TimeSpan.FromSeconds(10)); // отправка выполняется асинхронно
    }
}