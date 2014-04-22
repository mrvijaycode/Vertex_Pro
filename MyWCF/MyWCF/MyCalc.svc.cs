using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace MyWCF
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MyCalc" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select MyCalc.svc or MyCalc.svc.cs at the Solution Explorer and start debugging.
    public class MyCalc : IMyCalc
    {

        public Int32 Add(Int32 n1, int n2) {

            return n1 + n2;
        }

        public Int32 Substract(Int32 n1, int n2)
        {
            return n1 - n2;
        }

        public Int32 Multiply(Int32 n1, int n2)
        {
            return n1 * n2;
        }

        public Int32 Devide(Int32 n1, int n2)
        {
            return n1 / n2;
        }

    }
}
