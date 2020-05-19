using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopListing.API.Helpers
{
    public static class DateTimeOffsetExtension
    {
       public static int GetCurrentDate(this DateTimeOffset dateTimeOffset)
        {
            var currentDate = DateTime.UtcNow;
            int createdDate = currentDate.Year - dateTimeOffset.Year;

            if(currentDate < dateTimeOffset.AddYears(createdDate))
            {
                createdDate++;
            }
            return createdDate;
        }
    }
}
