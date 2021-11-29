
using Codeplanet.Models.ViewModels.IDEViewModels;
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
    public class ExecuteController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing new details", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ExecuteController> _logger;

        private readonly IIDEService _ideService;

        public ExecuteController(ILogger<ExecuteController> logger, IIDEService ideService)
        {
            _logger = logger;
            _ideService = ideService;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
        [HttpPost]
        public async Task<IActionResult> Post(IDERequestViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }
            var response = await _ideService.Run(model);
            return new JsonResult(response);

        }
    }


}

