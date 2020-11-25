using System.Linq;

namespace api.Utils
{
    public class StringToMinutesConversor
    {
        public int Convert(string date)
        {
            var split = date.Split(':');
            
            int hours = System.Convert.ToInt32(split.First());
            int minutes = System.Convert.ToInt32(split.Last());

            return minutes += (hours * 60);
        }
    }
}