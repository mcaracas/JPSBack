using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;

namespace API.Utilidades
{
    public static class EmailUtility
    {
        public static void EnviarEmail(string body, string subject, string to, string attachmentPath = null)
        {
            try
            {
                String from = "proyectoauditoriauna@gmail.com";
                String password = "vrelijvduioslqum";
                MailMessage email = new MailMessage();
                email.From = new MailAddress(from);
                //email.To.Add(to);
                email.Subject = subject;
                email.Body = body;

                // Split the string of recipients into an array and add each email address to the message's collection of recipients
                string[] recipients = to.Split(new char[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
                
                foreach (string recipient in recipients)
                {
                    email.To.Add(recipient.Trim());
                }

                if (attachmentPath != null)
                {
                    Attachment attachment = new Attachment(attachmentPath);
                    email.Attachments.Add(attachment);
                }

                SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587); 
                smtp.EnableSsl = true;
                smtp.Credentials = new System.Net.NetworkCredential(from, password);
                
                smtp.Send(email);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }            

        }
        
    }
}