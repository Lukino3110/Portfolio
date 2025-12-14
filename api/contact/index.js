module.exports = async function (context, req) {
  const { name, email, service, message } = req.body || {};

  // Logování do Azure Log Stream
  context.log("📩 Nová zpráva z formuláře:");
  context.log("Jméno:", name);
  context.log("Email:", email);
  context.log("Služba:", service);
  context.log("Zpráva:", message);

  // Odpověď zpět na frontend
  context.res = {
    status: 200,
    body: {
      message: "Zpráva byla úspěšně odeslána."
    }
  };
};
