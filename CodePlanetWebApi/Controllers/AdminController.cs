using Codeplanet.Models.ViewModels.Common;
using CodePlanet.Infrastructure.IDEService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace CodePlanetWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly ILogger<AdminController> _logger;

        private readonly IAdminService _adminService;

        public AdminController(ILogger<AdminController> logger, IAdminService adminService)
        {
            _logger = logger;
            _adminService = adminService;
        }

        [HttpPost]
        [Route("ValidateAdmin")]
        public IActionResult ValidateAdmin(ListViewModel model)
        {
            if (model.Id == 12344321)
            {
                return new JsonResult(true);
            }
            return new JsonResult(false);
        }

        [HttpGet]
        [Route("getModules")]
        public IActionResult GetModules()
        {
            return new JsonResult(_adminService.GetModules());
        }
        
        [HttpGet]
        [Route("getTopics/{id}")]
        public IActionResult GetTopics(int id)
        {

            return new JsonResult(_adminService.GetTopics(id));
        }
        
        [HttpGet]
        [Route("getProblems")]
        public IActionResult GetProblems()
        {
            return new JsonResult(_adminService.GetProblems());
        }
        [HttpPost]
        [Route("saveProblem")]
        public IActionResult SaveProblem(ProblemStatementViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }
            var response = _adminService.SaveProblem(model);
            return new JsonResult(response);

        }
        
        [HttpPost]
        [Route("deleteProblem")]
        public IActionResult DeleteProblem(ProblemStatementViewModel model)
        {
            return new JsonResult(_adminService.DeleteProblem(model.Id));
        }
    }


}

