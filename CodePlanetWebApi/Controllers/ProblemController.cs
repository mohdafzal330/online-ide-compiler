
using Codeplanet.Models.ViewModels.IDEViewModels;
using CodePlanet.Infrastructure.CommonService;
using CodePlanet.Infrastructure.IDEService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace CodePlanetWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProblemsController : ControllerBase
    {
        
        private readonly ILogger<ExecuteController> _logger;

        private readonly ICommonService _commonService;

        public ProblemsController(ILogger<ExecuteController> logger, ICommonService commonService)
        {
            _logger = logger;
            _commonService = commonService;
        }


        [HttpGet]
        [Route("detail/{id:int}")]
        public IActionResult Detail(int id)
        {
            if (id<=0)
            {
                return new JsonResult(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }
            var response = _commonService.GetProblemDetail(id);
            return new JsonResult(response);
        }
        
        [HttpGet]
        [Route("navdetails/{id:int}")]
        public IActionResult NavDetails(int id)
        {
            if (id<=0)
            {
                return new JsonResult(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }
            var response = _commonService.GetNavDetails(id);
            return new JsonResult(response);
        }
    }


}

