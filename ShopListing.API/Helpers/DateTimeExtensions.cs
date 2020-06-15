using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Helpers
{
    public static class DateTimeExtensions
    {
        public static string GetCurrentDate(this DateTime dateTime)
        {
            
            var createdDate = DateTime.Today.ToString("dd-MMM-yyyy");

            // if (currentDate < dateTime.AddYears(createdDate))
            // {
            //     createdDate--;
            // }

            return createdDate;
        }
    }
}

