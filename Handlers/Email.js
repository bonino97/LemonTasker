const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../Config/Email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password
    },
  });

//Generar HTML
const GenerarCorreoHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../Views/Emails/${archivo}.pug`, opciones); 
    return juice(html);
}

exports.EnviarCorreo = async (opciones) => { 
  const html = GenerarCorreoHTML(opciones.archivo, opciones);
  const text = htmlToText.fromString(html);

  let opcionesCorreo = {
    from: 'LemonTask <no-reply@lemontask.com>', // sender address
    to: opciones.usuario.email, // list of receivers
    subject: opciones.subject, // Su bject line 
    text, // plain text body
    html // html body
  }
  
  const enviarCorreo = util.promisify(transport.sendMail, transport);
  return enviarCorreo.call(transport, opcionesCorreo);
}

