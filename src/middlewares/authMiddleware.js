// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.sendStatus(401); // No autorizado
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Prohibido
//     }

//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
const { User, Case, TimelineEntry } = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // No autorizado
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403); // Prohibido
    }

    // Recuperar el usuario completo desde la base de datos
    const dbUser = await User.findByPk(user.id);

    if (!dbUser) {
      return res.sendStatus(403); // Prohibido
    }

    req.user = dbUser;
    next();
  });
};

const verifyTotalAdmin = (req, res, next) => {
  if (req.user.roleId === 1) { // Total Admin
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
};

const verifyOrganizationAdmin = async (req, res, next) => {
  if (req.user.roleId === 2) { // Organization Admin
    const resourceOrgId = req.body.organizationId || req.params.organizationId;
    if (req.user.organizationId === resourceOrgId) {
      return next();
    }
  }
  return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
};

const verifyLawyer = async (req, res, next) => {
  if (req.user.roleId === 3) { // Lawyer
    const userId = req.user.id;
    const caseId = req.params.caseId || req.body.caseId;
    const timelineEntryId = req.params.id || req.body.id;
    
    let caseRecord, timelineEntry;

    if (caseId) {
      caseRecord = await Case.findByPk(caseId);
    }

    if (timelineEntryId) {
      timelineEntry = await TimelineEntry.findByPk(timelineEntryId);
    }

    if (caseRecord && caseRecord.userId === userId) {
      return next();
    } else if (timelineEntry && timelineEntry.userId === userId) {
      return next();
    }

    const casesInOrganization = await Case.findAll({ where: { organizationId: req.user.organizationId } });
    const caseIds = casesInOrganization.map(c => c.id);

    if (caseIds.includes(caseId) || (timelineEntry && caseIds.includes(timelineEntry.caseId))) {
      return next();
    }
  }
  return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
};

module.exports = {
  authenticateToken,
  verifyTotalAdmin,
  verifyOrganizationAdmin,
  verifyLawyer
};
