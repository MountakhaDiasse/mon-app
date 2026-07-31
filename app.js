const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.json({
    application: 'Pipeline CI/CD Kubernetes',
    message: 'Bienvenue Professeur  ! Le pipeline CI/CD fonctionne correctement.',
    version: process.env.APP_VERSION || 'v3',
    status: 'Running'
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
});

// Informations sur le projet
app.get('/info', (req, res) => {
  res.json({
    auteur: 'Mountakha Diassé',
    technologie: 'Node.js + Express',
    ci_cd: 'Jenkins',
    conteneur: 'Docker',
    orchestration: 'Kubernetes',
    replicas: 3
  });
});

// Date et heure du serveur
app.get('/time', (req, res) => {
  res.json({
    serverTime: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application démarrée sur le port ${PORT}`);
  });
}

module.exports = app;