import * as nodemailer from 'nodemailer';
import * as config from 'config';

const {user,pass,host,port} = config.get('mail');

export const Mailer= async (data)=>{
    try {
        var transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: true,
            auth: {
                user: user,    //Email for sending 
                pass: pass       //SenderEmail password
            }
        });

        var mailOptions = {
            from: user,       //Email for sending 
            to: data.reciever,          //Recievers Email
            subject: data.subject,   //Email Subject
            text: data.message,      //Plain text message
            html: data.html          //HTML version  of plain text messgae
        };

        let feedbak = await transporter.sendMail(mailOptions);
        if (feedbak.rejected.length === 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}