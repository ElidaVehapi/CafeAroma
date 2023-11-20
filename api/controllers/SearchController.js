// DeinController.js

const DeinModel = require('./DeinModel'); // Stelle sicher, dass der Pfad zum Modell korrekt ist

module.exports = {
  search: async (req, res) => {
    const { name, cafetype } = req.query;

    try {
      let query = {};

      // Füge die Suche nach dem Namen hinzu, falls vorhanden
      if (name) {
        query.name = { contains: name };
      }

      // Füge die Suche nach dem cafetype hinzu, falls vorhanden
      if (cafetype) {
        query.cafetype = cafetype;
      }

      // Führe die Datenbankabfrage durch
      const results = await DeinModel.find(query);

      // Gib die Ergebnisse zurück
      return res.json(results);
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  }
};
