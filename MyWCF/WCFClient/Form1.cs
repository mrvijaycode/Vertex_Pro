using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WCFClient.vertexService;

namespace WCFClient
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnSubmit_Click(object sender, EventArgs e)
        {
            MyCalcClient sv = new MyCalcClient();

            Int32 nm1 = Convert.ToInt32(textBox1.Text.Trim());
            Int32 nm2 = Convert.ToInt32(textBox2.Text.Trim());

           textBox3.Text= sv.Add(nm1,nm2).ToString();

        }
    }
}
