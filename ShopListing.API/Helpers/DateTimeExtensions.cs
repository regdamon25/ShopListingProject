using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Helpers
{
    public static class DateTimeExtensions
    {
        public static int GetCurrentDate(this DateTime dateTime)
        {
            var currentDate = DateTime.UtcNow;
            int createdDate = currentDate.Year;

            if (currentDate < dateTime.AddYears(createdDate))
            {
                createdDate--;
            }

            return createdDate;
        }
    }
}

