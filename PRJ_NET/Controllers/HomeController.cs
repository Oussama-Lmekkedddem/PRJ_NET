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
            // Récupérer les villes de départ et d'arrivée depuis le repository des villes
            var departureCities = _cityRepository.GetAllDepartureCities();
            var arrivalCities = _cityRepository.GetAllArrivalCities();

            // Passer les villes à la vue pour affichage dans les champs de saisie
            ViewBag.DepartureCities = departureCities;
            ViewBag.ArrivalCities = arrivalCities;

            // Initialiser les résultats de recherche à null (ils seront définis si une recherche est effectuée)
            ViewBag.SearchResults = null;

            return View();
        }

        [HttpPost]
        public IActionResult Index(string departureCity, string arrivalCity, DateTime selectedDate)
        {
            // Si des critères de recherche sont fournis, effectuer la recherche dans la base de données
            if (!string.IsNullOrEmpty(departureCity) && !string.IsNullOrEmpty(arrivalCity) && selectedDate != DateTime.MinValue)
            {
                var searchResults = _ticketRepository.Search(departureCity, arrivalCity, selectedDate);
                return View(searchResults); // Renvoyer la vue avec les résultats de recherche
            }

            // Si aucun critère de recherche n'est fourni, renvoyer la vue avec les villes de départ et d'arrivée
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
