using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IO;

namespace EncryptConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            try {
                Console.WriteLine("original String");
                string originalString = Console.ReadLine();
                string cryptedString = Encrypt(originalString);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\nEncrypted Result: {0}",cryptedString);
                Console.WriteLine("\nDecrypted Result: {0}",Decrypt(cryptedString));
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("From: {0}.\nDetail: {1}", ex.Source, ex.Message);
            }
            finally {
                Console.ReadLine();
            }
        }

        static byte[] bytes = ASCIIEncoding.ASCII.GetBytes("vijaybha");

        //Encrption method
        public static string Encrypt(string originalString)
        { 
            if(String.IsNullOrEmpty(originalString))
            {
                throw new ArgumentNullException("The string needs to be encrypted can not be null");
            }
            DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();

            MemoryStream memoryStream = new MemoryStream();
            CryptoStream cryptoStream = new CryptoStream(memoryStream,cryptoProvider.CreateEncryptor(bytes,bytes),CryptoStreamMode.Write);
            StreamWriter writer= new StreamWriter(cryptoStream);
            writer.Write(originalString);
            writer.Flush();
            cryptoStream.FlushFinalBlock();
            writer.Flush();
            return Convert.ToBase64String(memoryStream.GetBuffer(),0,(int)memoryStream.Length);
        }


        //Decryption method
        public static string Decrypt(string cryptedString)
        {
            if (String.IsNullOrEmpty(cryptedString))
            {
                throw new ArgumentNullException("The string which needs to be Decrypted can't be null");
            }

            DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
            MemoryStream memoryStream = new MemoryStream(Convert.FromBase64String(cryptedString));

            CryptoStream cryptoStream = new CryptoStream(memoryStream,cryptoProvider.CreateDecryptor(bytes,bytes),CryptoStreamMode.Read);
            StreamReader reader = new StreamReader(cryptoStream);
            return reader.ReadToEnd();
        }
    }
}
