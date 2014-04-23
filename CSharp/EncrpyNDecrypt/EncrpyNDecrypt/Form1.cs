using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Security.Cryptography;

namespace EncrpyNDecrypt
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        //RSA Algorithm With C#
        //Encription method
        static public byte[] Encryption(byte[] Data, RSAParameters RSAKey, bool DoOAEPPadding)
        {
            try
            {
                byte[] encryptedData;
                using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
                {
                    RSA.ImportParameters(RSAKey);
                    encryptedData = RSA.Encrypt(Data, DoOAEPPadding);
                }
                return encryptedData;
            }
            catch (CryptographicException e)
            {
                MessageBox.Show(e.Message);
                return null;
            }
        }

        //Decryption Method
        static public byte[] Decryption(byte[] Data,RSAParameters RSAKey, bool DoOAEPPadding)
        {
            try {
                byte[] decryptedData;
                using(RSACryptoServiceProvider RSA = new RSACryptoServiceProvider()){
                    RSA.ImportParameters(RSAKey);
                    decryptedData = RSA.Decrypt(Data,DoOAEPPadding);
                }return decryptedData;
            }
            catch (CryptographicException e) { MessageBox.Show(e.Message); return null; }
        }


        //Fornt application
        UnicodeEncoding ByteConverter = new UnicodeEncoding();
        RSACryptoServiceProvider RSA = new RSACryptoServiceProvider();

        byte[] plaintext;
        byte[] encryptedtext;

        private void btnEcnrypt_Click(object sender, EventArgs e)
        {
            plaintext = ByteConverter.GetBytes(txtPlain.Text);
            encryptedtext = Encryption(plaintext, RSA.ExportParameters(true), false);
            txtEncrypt.Text = ByteConverter.GetString(encryptedtext);
        }

        private void btnDecrypt_Click(object sender, EventArgs e)
        {
            byte[] decryptedText = Decryption(encryptedtext, RSA.ExportParameters(true), false);
            txtDecrypt.Text = ByteConverter.GetString(decryptedText);   
        }
    }
}
