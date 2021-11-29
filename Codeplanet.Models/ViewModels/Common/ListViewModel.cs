using System;
using System.Collections.Generic;
using System.Text;

namespace Codeplanet.Models.ViewModels.Common
{
    public class ListViewModel
    {
        public long Id { get; set; }
        public String Name { get; set; }
        public List<ListViewModel> ChildLists { get; set; }
    }
}
