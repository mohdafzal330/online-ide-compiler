using System;

namespace Codeplanet.Models.ViewModels.IDEViewModels
{
    public class IDEResponeViewModel : JoodleResponseViewModel
    {
        public int PassedTestCases { get; set; }
        public int FailedTestCases { get; set; }
        public int TotalTestCases { get; set; }
        public string Status { get; set; }
    }
    public class JoodleResponseViewModel
    {
        public int statusCode { get; set; }
        public string error { get; set; }
        public string output { get; set; }
        public int? memory { get; set; }
        public double? cpuTime { get; set; }
    }

    
}
