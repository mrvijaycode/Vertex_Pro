using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace MyWCF
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMyCalc" in both code and config file together.
    [ServiceContract]
    public interface IMyCalc
    {
        [OperationContract]
        Int32 Add(Int32 n1, int n2);

        [OperationContract]
        Int32 Substract(Int32 n1, int n2);

        [OperationContract]
        Int32 Multiply(Int32 n1, int n2);

        [OperationContract]
        Int32 Devide(Int32 n1, int n2);

    }
}
