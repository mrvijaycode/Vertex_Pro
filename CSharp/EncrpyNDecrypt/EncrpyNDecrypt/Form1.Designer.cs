namespace EncrpyNDecrypt
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.txtPlain = new System.Windows.Forms.TextBox();
            this.txtEncrypt = new System.Windows.Forms.TextBox();
            this.txtDecrypt = new System.Windows.Forms.TextBox();
            this.btnEcnrypt = new System.Windows.Forms.Button();
            this.btnDecrypt = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // txtPlain
            // 
            this.txtPlain.Location = new System.Drawing.Point(25, 42);
            this.txtPlain.Multiline = true;
            this.txtPlain.Name = "txtPlain";
            this.txtPlain.Size = new System.Drawing.Size(380, 77);
            this.txtPlain.TabIndex = 0;
            // 
            // txtEncrypt
            // 
            this.txtEncrypt.Location = new System.Drawing.Point(25, 125);
            this.txtEncrypt.Multiline = true;
            this.txtEncrypt.Name = "txtEncrypt";
            this.txtEncrypt.Size = new System.Drawing.Size(380, 77);
            this.txtEncrypt.TabIndex = 1;
            // 
            // txtDecrypt
            // 
            this.txtDecrypt.Location = new System.Drawing.Point(25, 208);
            this.txtDecrypt.Multiline = true;
            this.txtDecrypt.Name = "txtDecrypt";
            this.txtDecrypt.Size = new System.Drawing.Size(380, 77);
            this.txtDecrypt.TabIndex = 2;
            // 
            // btnEcnrypt
            // 
            this.btnEcnrypt.Location = new System.Drawing.Point(463, 60);
            this.btnEcnrypt.Name = "btnEcnrypt";
            this.btnEcnrypt.Size = new System.Drawing.Size(75, 23);
            this.btnEcnrypt.TabIndex = 3;
            this.btnEcnrypt.Text = "Encrypt";
            this.btnEcnrypt.UseVisualStyleBackColor = true;
            this.btnEcnrypt.Click += new System.EventHandler(this.btnEcnrypt_Click);
            // 
            // btnDecrypt
            // 
            this.btnDecrypt.Location = new System.Drawing.Point(463, 152);
            this.btnDecrypt.Name = "btnDecrypt";
            this.btnDecrypt.Size = new System.Drawing.Size(75, 23);
            this.btnDecrypt.TabIndex = 4;
            this.btnDecrypt.Text = "Decrypt";
            this.btnDecrypt.UseVisualStyleBackColor = true;
            this.btnDecrypt.Click += new System.EventHandler(this.btnDecrypt_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(589, 373);
            this.Controls.Add(this.btnDecrypt);
            this.Controls.Add(this.btnEcnrypt);
            this.Controls.Add(this.txtDecrypt);
            this.Controls.Add(this.txtEncrypt);
            this.Controls.Add(this.txtPlain);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtPlain;
        private System.Windows.Forms.TextBox txtEncrypt;
        private System.Windows.Forms.TextBox txtDecrypt;
        private System.Windows.Forms.Button btnEcnrypt;
        private System.Windows.Forms.Button btnDecrypt;
    }
}

