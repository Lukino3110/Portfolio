const sgMail = require("@sendgrid/mail");

module.exports = async function (context, req) {
  const { name, email, service, message } = req.body;

  // ✅ 1) Načtení API klíče ze Static Web Apps (musí být v proměnných prostředí)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // ✅ 2) TADY ZMĚŇ → e-mail, na který chceš dostávat zprávy
  const TO_EMAIL = "prochaz.lukas@gmail.com";

  // ✅ 3) TADY ZMĚŇ → e-mail, který jsi ověřil v SendGridu jako odesílatele
  const FROM_EMAIL = "prochaz.lukas@email.cz";

  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL,
    subject: `Nová zpráva z portfolia od ${name}`,
    text: `
Jméno: ${name}
Email: ${email}
Služba: ${service}

Zpráva:
${message}
    `,
  };

  try {
    await sgMail.send(msg);

    return {
      status: 200,
      body: { success: true }
    };
  } catch (err) {
    context.log("SendGrid error:", err);
    return {
      status: 500,
      body: { success: false, error: "Email se nepodařilo odeslat." }
    };
  }
};
