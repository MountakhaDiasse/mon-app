const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ message: 'Pipeline CI/CD Kubernetes OK', version: process.env.APP_VERSION || 'v1' });
});

app.get('/health', (req, res) => res.status(200).send('OK'));

// Ne démarre le serveur que si le fichier est exécuté directement,
// pas quand il est importé par les tests (Jest)
if (require.main === module) {
  app.listen(PORT, () => console.log(`App démarrée sur le port ${PORT}`));
}

module.exports = app;