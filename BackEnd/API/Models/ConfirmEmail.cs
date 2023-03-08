using System;
using System.Net;
using System.Net.Mail;

namespace API
{
    public partial class ConfirmEmail
    {
        public void Page_Load(String email, String code, String type)
        {
            string fromEmailAddress = "proyectoauditoriauna@gmail.com";
            string fromEmailPassword = "vrelijvduioslqum";
            string toEmailAddress = email;
            string confirmationCode = code;
            // Send email to the user with the confirmation code
            using (var mail = new MailMessage(fromEmailAddress, toEmailAddress))
            {
                try
                {
                    mail.Subject = "Email Confirmation";
                    mail.Body = string.Format(type + "{0}", confirmationCode);
                    mail.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(fromEmailAddress, fromEmailPassword);
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error sending email: " + ex.Message);
                }
            }
        }
    }
}
