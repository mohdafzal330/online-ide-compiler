using System;

namespace Codeplanet.Models.ViewModels.IDEViewModels
{
    public class IDERequestViewModel : JoodleRequestViewModel
    {
        public bool IsCompile{ get; set; }
        public TestCaseViewModel TestCase { get; set; }
    }

    public class JoodleRequestViewModel
    {
        public string script { get; set; }
        public string language { get; set; }
        public string stdin { get; set; }
        public string clientId { get; set; }
        public string clientSecret { get; set; }
    }
}
