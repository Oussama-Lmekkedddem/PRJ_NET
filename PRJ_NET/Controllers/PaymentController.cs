using Microsoft.AspNetCore.Mvc;

namespace PRJ_NET.Controllers
{
    public class PaymentController : Controller
    {
        public ActionResult getpdf()
        {
           
            return View();
        }

        public ActionResult payinfo()
        {
            
            return View();
        }

        public ActionResult verification()
        {
            
            return View();
        }
        public ActionResult persinfo()
        {

            return View();
        }

      
        [HttpPost]
        public IActionResult transinfo(string car, string city1, string time1, string city2, string time2, string price, int quantity)
        {

            ViewBag.Car = car;
            ViewBag.City1 = city1;
            ViewBag.Time1 = time1;
            ViewBag.City2 = city2;
            ViewBag.Time2 = time2;
            ViewBag.Price = price;
            ViewBag.Quantity = quantity;

            return View();
        }
    }
}
