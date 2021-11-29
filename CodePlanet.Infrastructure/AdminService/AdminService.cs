using Codeplanet.Common.Enums;
using Codeplanet.Models;
using Codeplanet.Models.Context;
using Codeplanet.Models.DataModels;
using Codeplanet.Models.ViewModels.Common;
using Codeplanet.Models.ViewModels.IDEViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CodePlanet.Infrastructure.IDEService
{
    public class AdminService : IAdminService
    {
        public CDDBContext _dbContext { get; set; }
        public AdminService(CDDBContext context)
        {
            this._dbContext = context;
        }
        public ResponseViewModel SaveProblem(ProblemStatementViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return new ResponseViewModel { Status = "Invalid Input" };
                }

                if (model.Id > 0)
                {
                    return UpdateProblem(model);
                }

                long sampleTestId = -1;
                if (model.SampleTestCase != null)
                {
                    var testIds = SaveTestCases(new List<TestCaseViewModel> { model.SampleTestCase});
                    if (testIds.Count > 0)
                    {
                        sampleTestId = testIds[0];
                    }
                }
                var problem = new CDProblems
                {
                    FkModuleId = model.Module,
                    FkTopicId = model.Topic,
                    Title = model.Title,
                    Content = model.ProblemContent,
                    FkSampleTestCaseId = sampleTestId,
                    SolutionVideo = model.SolutionVideoLink
                };
                _dbContext.CDProblems.Add(problem);
                _dbContext.SaveChanges();
                return new ResponseViewModel { Status = "Success" };
            }
            catch(Exception ex)
            {
                return null;
            }
        }
        public ResponseViewModel UpdateProblem(ProblemStatementViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return new ResponseViewModel { Status = "Invalid Input" };
                }
                if (model.SampleTestCase != null)
                {
                    SaveTestCases(new List<TestCaseViewModel> { model.SampleTestCase});                    
                }
                var problem = _dbContext.CDProblems.Where(p => p.Id == model.Id && p.RowStatus == 1).FirstOrDefault();
                if (problem == null)
                {
                    return new ResponseViewModel { Status = "Problem Not foudnd" };
                }

                problem.Title = model.Title;
                problem.FkModuleId = model.Module;
                problem.FkTopicId = model.Topic;
                problem.Content = model.ProblemContent;
                problem.SolutionVideo = model.SolutionVideoLink;

                _dbContext.SaveChanges();
                return new ResponseViewModel { Status = "Success" };
            }
            catch(Exception ex)
            {
                return new ResponseViewModel { Status = "Server error" };
            }
        }
        
        public List<long> SaveTestCases(List<TestCaseViewModel> testCases)
        {
            try
            {
                var testIds = new List<long>();
                if (testCases==null || testCases.Count == 0)
                {
                    return testIds;
                }
                for(int loopIndex = 0; loopIndex < testCases.Count; loopIndex++)
                {
                    var testCase = testCases[loopIndex];
                    if (testCase.Id > 0)
                    {
                        var t = _dbContext.CDTestCases.Where(t => t.Id == testCase.Id).FirstOrDefault();
                        if (t != null)
                        {
                            t.Input = testCase.Input;
                            t.Output = testCase.ExpectedOutput;
                            _dbContext.SaveChanges();
                        }
                    } else
                    {
                        var test = new CDTestCases
                        {
                            Input = testCase.Input,
                            Output = testCase.ExpectedOutput
                        };
                        _dbContext.CDTestCases.Add(test);
                        _dbContext.SaveChanges(); testIds.Add(test.Id);
                    }
                }
                return testIds;
            }
            catch(Exception ex)
            {
                return new List<long>();
            }
        } public List<ListViewModel> GetTopics(int moduleId)
        {
            try
            {
                if (moduleId > 0)
                {
                    return _dbContext.CDTopics.Where(t=>t.FkModuleId == moduleId && t.RowStatus == 1).Select(s => new ListViewModel
                    {
                        Id = s.Id,
                        Name = s.Name
                    }).ToList();
                }
                else
                {

                return _dbContext.CDTopics.Select(s=> new ListViewModel { 
                    Id = s.Id, Name = s.Name
                }).ToList();
                }
            }
            catch(Exception ex)
            {
                return new List<ListViewModel>();
            }
        }

        public List<ListViewModel> GetModules()
        {
            try
            {
                return _dbContext.CDModules.Where(m=>m.RowStatus==1).Select(s => new ListViewModel
                {
                    Id = s.Id,
                    Name = s.Name
                }).ToList();
            }
            catch (Exception ex)
            {
                return new List<ListViewModel>();
            }
        }

        public List<ProblemStatementViewModel> GetProblems()
        {
            try
            {
                var problems = _dbContext.CDProblems.Where(p=>p.RowStatus == 1)
                    .Join(_dbContext.CDTopics, p => p.FkTopicId, t => t.Id, (p, t) => new { p, t })
                    .Select(res => new ProblemStatementViewModel
                    {
                        Id = res.p.Id,
                        Title = res.p.Title,
                        ProblemContent = res.p.Content,
                        SampleTestCaseId = res.p.FkSampleTestCaseId,
                        SolutionVideoLink = res.p.SolutionVideo,
                        TopicName = res.t.Name
                    }).ToList();

                return problems;
            }
            catch (Exception ex)
            {
                return new List<ProblemStatementViewModel>();
            }
        }
        
        public ResponseViewModel DeleteProblem(long id)
        {
            try
            {
                if (id <= 0)
                {
                    return new ResponseViewModel { Status = "Invalid input" };
                }
                var problem = _dbContext.CDProblems.Where(p=> p.Id==id && p.RowStatus == 1).FirstOrDefault();
                if (problem == null)
                {
                    return new ResponseViewModel { Status = "Not found" };
                }

                problem.RowStatus = 0;
                _dbContext.SaveChanges();

               return new ResponseViewModel { Status = "Success" };
            }
            catch (Exception ex)
            {
                return new ResponseViewModel { Status = "Server error" }; ;
            }
        }
    }
}
