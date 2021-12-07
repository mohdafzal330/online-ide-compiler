using Codeplanet.Models.Context;
using Codeplanet.Models.ViewModels.Common;
using Codeplanet.Models.ViewModels.IDEViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodePlanet.Infrastructure.CommonService
{
    public class CommonService : ICommonService
    {
        public CDDBContext _dbContext { get; set; }
        public CommonService(CDDBContext context)
        {
            _dbContext = context;
        }

        public ProblemStatementViewModel GetProblemDetail(int problemId)
        {
            try
            {
                var problem = _dbContext.CDProblems.Where(p => p.Id == problemId && p.RowStatus == 1)
                    .Join(_dbContext.CDTopics, p => p.FkTopicId, t => t.Id, (p, t) => new { p, t })
                    .Select(res => new ProblemStatementViewModel
                    {
                        Title = res.p.Title,
                        ProblemContent = res.p.Content,
                        SampleTestCaseId = res.p.FkSampleTestCaseId,
                        SolutionVideoLink = res.p.SolutionVideo,
                        DefaultScript = res.p.DefaultScript,
                        TopicName = res.t.Name,
                        Topic = res.t.Id
                    }).FirstOrDefault();

                if (problem != null && problem.SampleTestCaseId > 0)
                {
                    var testCase = _dbContext.CDTestCases.Where(t => t.Id == problem.SampleTestCaseId
                    && t.RowStatus == 1).FirstOrDefault();
                    var test = new TestCaseViewModel();
                    test.Id = testCase.Id;
                    test.Input = Format(testCase.Input);
                    test.ExpectedOutput = Format(testCase.Output);
                    problem.SampleTestCase = test;
                }
                return problem;
            }
            catch (Exception ex)
            {
                return new ProblemStatementViewModel();
            }
        }

        public List<ListViewModel> GetNavDetails(long moduleId)
        {
            try
            {
                var topics = GetTopics(moduleId);
                for (int loopIndex = 0; loopIndex < topics.Count; loopIndex++)
                {
                    var problems = GetProblems(topics[loopIndex].Id);

                    topics[loopIndex].ChildLists = problems.Count > 0 ? problems : null;
                }
                return topics;
            }
            catch (Exception ex)
            {
                return new List<ListViewModel>();
            }
        }
        public List<ListViewModel> GetTopics(long moduleId)
        {
            try
            {
                var topics = _dbContext.CDTopics.Where(t => t.FkModuleId == moduleId && t.RowStatus == 1)
                    .Select(t => new ListViewModel
                    {
                        Id = t.Id,
                        Name = t.Name
                    }).ToList();
                return topics;
            }
            catch (Exception ex)
            {
                return new List<ListViewModel>();
            }
        }
        private List<ListViewModel> GetProblems(long topicId)
        {
            try
            {
                var problems = _dbContext.CDProblems.Where(p => p.FkTopicId == topicId && p.RowStatus == 1)
                    .Select(p => new ListViewModel
                    {
                        Id = p.Id,
                        Name = p.Title
                    }).ToList();
                return problems;
            }
            catch (Exception ex)
            {
                return new List<ListViewModel>();
            }
        }
        public string Format(string inp)
        {
            var result = inp.Replace("\\n", "\n");
            result = result.Replace("\\t", "\t");
            result = result.Replace("\\r", "\r");
            return result;
        }
    }
}
