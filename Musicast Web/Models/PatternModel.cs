using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web.Models
{
    public class PatternModel
    {
        public List<Pattern> patterns;
        public class Pattern
        {
            List<String> drumPreset;
            SynthPattern synthPattern;
        }
    }
}