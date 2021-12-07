namespace Codeplanet.Models.DataModels
{
    public class CDProblems
    {
        public long Id { get; set; }
        public long FkModuleId { get; set; }
        public long FkTopicId { get; set; }
        public long FkSampleTestCaseId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string SolutionVideo { get; set; }
        public string DefaultScript { get; set; }

        public int RowStatus { get; set; }
    }

}
