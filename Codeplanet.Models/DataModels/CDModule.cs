using System;
using System.Collections.Generic;
using System.Text;

namespace Codeplanet.Models.DataModels
{
    public class CDModule
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int RowStatus { get; set; } = 0;
    }

}
