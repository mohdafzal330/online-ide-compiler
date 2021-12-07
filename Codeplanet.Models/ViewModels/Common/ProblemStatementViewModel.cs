using Codeplanet.Models.ViewModels.IDEViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Codeplanet.Models.ViewModels.Common
{
    public class ProblemStatementViewModel
    {
        public long Id { get; set; }
        public long Module { get; set; }
        public long Topic { get; set; }
        public string TopicName{ get; set; }
        public string Title { get; set; }
        public string ProblemContent { get; set; }
        public string SolutionVideoLink { get; set; }
        public string DefaultScript { get; set; }
        public long SampleTestCaseId { get; set; }
        public TestCaseViewModel SampleTestCase { get; set; }
    }
}
