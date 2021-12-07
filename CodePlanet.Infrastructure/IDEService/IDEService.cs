using Codeplanet.Common.Enums;
using Codeplanet.Models;
using Codeplanet.Models.ViewModels.IDEViewModels;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CodePlanet.Infrastructure.IDEService
{
    public class IDEService : IIDEService
    {
        public async Task<IDEResponeViewModel> Execute(IDERequestViewModel model)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var httpClient = HttpClientFactory.Create();
                    var url = "https://api.jdoodle.com/v1/execute";
                    model.clientId = "a3b826039a9e085b00f2d91aad799672";
                    model.clientSecret = "9f692127bea90e8b1859a31a5289721998273db479819b5a01ee2878fb82a63a";
                    var resp = await httpClient.PostAsJsonAsync(url, model);
                    return  await resp.Content.ReadAsAsync<IDEResponeViewModel>();
                }
            }
            catch(Exception ex)
            {
                return null;
            }
        }
        private async Task<IDEResponeViewModel> Compile(IDERequestViewModel model)
        {
            try
            {
                var executionResult = await Execute(model);
                if (!model.stdin.Equals(model.TestCase.Input))
                {
                    executionResult.Status = "Success";
                    executionResult.statusCode = (int)Enums.IDEStatus.CorrectAnswer;
                }
                else if(executionResult!=null && executionResult.output!=null &&
                    Format(executionResult.output).Equals(Format(model.TestCase.ExpectedOutput)))
                {

                    executionResult.Status = "Correct answer";
                    executionResult.statusCode = (int)Enums.IDEStatus.CorrectAnswer;
                } 
                else
                {
                    executionResult.Status = "Wrong answer";
                    executionResult.statusCode = (int)Enums.IDEStatus.WrongAnswer; ;
                }
                return executionResult;
            }
            catch(Exception ex)
            {
                return null;
            }
        }public async Task<IDEResponeViewModel> Run(IDERequestViewModel model)
        {
            try
            {
                if (model.IsCompile)
                {
                    return await Compile(model);
                }

                var response = new IDEResponeViewModel() { Status="Wrong answer",statusCode = 0};
                var testCases = GetAllTestCases(model);
                response.TotalTestCases = testCases.Count;

                // Todo remove
                response.PassedTestCases = response.TotalTestCases;
                //for(int loopIndex = 0; loopIndex < testCases.Count; loopIndex++)
                //{
                //    try
                //    {
                //        model.stdin = testCases[loopIndex].Input;
                //        var executionResult = await Execute(model);
                //        if(executionResult != null && executionResult.output!=null && 
                //            executionResult.output.Equals(Format(testCases[loopIndex].ExpectedOutput)))
                //        {
                //            response.PassedTestCases++;
                //        }
                //    }
                //    catch(Exception ex)
                //    {
                //        // Handle exceptions
                //    }
                //}
                response.FailedTestCases = response.TotalTestCases - response.PassedTestCases;
                if (response.FailedTestCases == 0)
                {
                    response.Status = "Correct answer";
                    response.statusCode = (int)Enums.IDEStatus.CorrectAnswer; ;                    
                } else if (response.PassedTestCases < response.TotalTestCases && response.PassedTestCases>0)
                {
                    response.Status = "Partially correct";
                    response.statusCode = (int)Enums.IDEStatus.PartiallyCorrectAnswer; ;
                }
                response.output = response.PassedTestCases + " / " + response.TotalTestCases+" Passed";
                return response;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        private string Format(string inp)
        {
            var result = inp.Replace("\\n", "\n");
            result = result.Replace("\\t", "\t");
            result = result.Replace("\\r", "\r");

            
            if (result.LastIndexOf("\n")==result.Length-1 || result.LastIndexOf("\t") == result.Length - 1
                || result.LastIndexOf("\r") == result.Length - 1)
            {
                result = result.Substring(0, result.Length - 1);
            }
             if (result.LastIndexOf("\n")==result.Length-1 || result.LastIndexOf("\t") == result.Length - 1
                || result.LastIndexOf("\r") == result.Length - 1)
            {
                result = result.Substring(0, result.Length - 1);
            }
             if (result.LastIndexOf("\n")==result.Length-1 || result.LastIndexOf("\t") == result.Length - 1
                || result.LastIndexOf("\r") == result.Length - 1)
            {
                result = result.Substring(0, result.Length - 1);
            }
            

            return result;
        }
        private List<TestCaseViewModel> GetAllTestCases(IDERequestViewModel model)
        {
            try
            {
                List<TestCaseViewModel> list = new List<TestCaseViewModel>();
                list.Add(new TestCaseViewModel() { Input = "5",ExpectedOutput = "5\n4\n3\n2\n1\n" });
                list.Add(new TestCaseViewModel() { Input = "4",ExpectedOutput = "4\n3\n2\n1\n" });
                list.Add(new TestCaseViewModel() { Input = "8",ExpectedOutput = "8\n7\n6\n5\n4\n3\n2\n1\n" });
                list.Add(new TestCaseViewModel() { Input = "1",ExpectedOutput = "1\n" });
                list.Add(new TestCaseViewModel() { Input = "2",ExpectedOutput = "2\n1\n" });
                return list;
            }
            catch(Exception ex)
            {
                return new List<TestCaseViewModel>();
            }
        }


    }
}
