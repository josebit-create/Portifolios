const tokenAdm = process.env.RG_ADM_TOKEN;

const authorizeAdminRegistration = (req, res, next) => {
  const { role, adminToken } = req.body;

  if (role === "admin") {
    if (adminToken !== tokenAdm) {
      return res.status(403).json({
        errors: ["Acesso negado!"],
      });
    }
  }

  next();
};

module.exports = authorizeAdminRegistration;
