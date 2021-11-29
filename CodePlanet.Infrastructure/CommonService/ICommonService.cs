using Codeplanet.Models.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodePlanet.Infrastructure.CommonService
{
    public interface ICommonService
    {
        ProblemStatementViewModel GetProblemDetail(int prodlemId);
        List<ListViewModel> GetNavDetails(long moduleId);
    }
}
