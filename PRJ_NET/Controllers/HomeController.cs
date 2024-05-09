using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PRJ_NET.Data;
using PRJ_NET.Models;
using PRJ_NET.Models.Entities;
using PRJ_NET.Repositories;
using System;
using System.Diagnostics;

namespace PRJ_NET.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly TicketRepository _ticketRepository;
        private readonly CityRepository _cityRepository;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
            _ticketRepository = new TicketRepository(_context);
            _cityRepository = new CityRepository(_context);
        }

        public IActionResult Index()
        {
            // R�cup�rer les villes de d�part et d'arriv�e depuis le repository des villes
            var departureCities = _cityRepository.GetAllDepartureCities();
            var arrivalCities = _cityRepository.GetAllArrivalCities();

            // Passer les villes � la vue pour affichage dans les champs de saisie
            ViewBag.DepartureCities = departureCities;
            ViewBag.ArrivalCities = arrivalCities;

            // Initialiser les r�sultats de recherche � null (ils seront d�finis si une recherche est effectu�e)
            ViewBag.SearchResults = null;

            return View();
        }

        [HttpPost]
        public IActionResult Index(string departureCity, string arrivalCity, DateTime selectedDate)
        {
            // Si des crit�res de recherche sont fournis, effectuer la recherche dans la base de donn�es
            if (!string.IsNullOrEmpty(departureCity) && !string.IsNullOrEmpty(arrivalCity) && selectedDate != DateTime.MinValue)
            {
                var searchResults = _ticketRepository.Search(departureCity, arrivalCity, selectedDate);
                return View(searchResults); // Renvoyer la vue avec les r�sultats de recherche
            }

            // Si aucun crit�re de recherche n'est fourni, renvoyer la vue avec les villes de d�part et d'arriv�e
            var departureCities = _cityRepository.GetAllDepartureCities();
            var arrivalCities = _cityRepository.GetAllArrivalCities();
            ViewBag.DepartureCities = departureCities;
            ViewBag.ArrivalCities = arrivalCities;
            ViewBag.SearchResults = null;
            return View();
        }



        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
