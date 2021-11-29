using System;
using System.Collections.Generic;
using System.Text;

namespace Codeplanet.Models.ViewModels.IDEViewModels
{
    public class TestCaseViewModel
    {
        public long Id { get; set; }
        public string Input { get; set; }
        public string ExpectedOutput { get; set; }
    }
}
