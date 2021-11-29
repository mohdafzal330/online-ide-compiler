using Codeplanet.Models.ViewModels.IDEViewModels;
using System.Threading.Tasks;

namespace CodePlanet.Infrastructure.IDEService
{
    public interface IIDEService
    {
        Task<IDEResponeViewModel> Execute(IDERequestViewModel model);
        Task<IDEResponeViewModel> Run(IDERequestViewModel model);
    }
}
