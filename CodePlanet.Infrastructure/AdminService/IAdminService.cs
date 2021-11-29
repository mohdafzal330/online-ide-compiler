using Codeplanet.Models.ViewModels.Common;
using Codeplanet.Models.ViewModels.IDEViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodePlanet.Infrastructure.IDEService
{
    public interface IAdminService
    {
        ResponseViewModel SaveProblem(ProblemStatementViewModel model);
        List<ListViewModel> GetTopics(int moduleId);
        List<ListViewModel> GetModules();
        List<ProblemStatementViewModel> GetProblems();
        ResponseViewModel DeleteProblem(long id);
    }
}
