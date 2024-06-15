require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const organizationRoutes = require('./src/routes/organizationRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const caseTypeRoutes = require('./src/routes/caseTypeRoutes');
const caseRoutes = require('./src/routes/caseRoutes');
const timelineEntryRoutes = require('./src/routes/timelineEntryRoutes');
const statusRoutes = require('./src/routes/statusRoutes');
const attachmentRoutes = require('./src/routes/attachmentRoutes');

// Endpoints de Usuarios
app.use('/api/users', userRoutes);

// Endpoints Protegidos
app.use('/api/roles', roleRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/casetypes', caseTypeRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/timelineentries', timelineEntryRoutes);
app.use('/api/statuses', statusRoutes);
app.use('/api/attachments', attachmentRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
