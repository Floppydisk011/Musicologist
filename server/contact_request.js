 
const nodemailer = require('nodemailer')

async function contactRequest(firstName, lastName, email, message){
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "musicologist.business@gmail.com",
                pass: "Musicologist01"
            }
        })

        const mailOptions = {
            from: "musicologist.business@gmail.com",
            to: 'musicologist.business@gmail.com',
            subject: firstName + ' ' + lastName + ' ' + email,
            text: message
        }

        await transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                console.error('Error sending email: ', error)
                return{
                    success: false
                }
            }
            else{
                console.log("Email sent successfully: ", info.response)
                return{
                    success: true
                }
            }
        })
    }catch(err){
        console.error("Error: ",err)
    }
}

module.exports = contactRequest