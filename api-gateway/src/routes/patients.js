const { v4: uuidv4 } = require('uuid'); 
const path = require('path');

const patientRoutes = (app, fs) => {
    const dataPath = path.join(__dirname, '../../data', 'patients.json');

    let patients = getInfo();

    function getInfo() {
        try {
          const data = fs.readFileSync(dataPath, 'utf-8');
          return JSON.parse(data);
        } 
        catch (error) {
          console.error('Error reading data: ', error);
          return [];
        }
      }

      function saveInfo() {
        try {
          fs.writeFileSync(dataPath, JSON.stringify(patients, null, 2), 'utf-8');
        } 
        catch (error) {
          console.error('Error writing data: ', error);
        }
      }

      app.get('/api/patients', (req, res) => {
        res.json(patients);
      });

      app.post('/api/patients', (req, res) => {
        let uuid = uuidv4();
        const newPatient = { ...req.body, id: uuid, displayId: "P-"+uuid.substring(0,6).toUpperCase() };
        
        patients.push(newPatient);
        saveInfo();

        res.json(newPatient);
      });

      app.put('/api/patients/:id', (req, res) => {
        const idToUpdate = req.params.id;
        const updatedPatient = req.body;

        patients = patients.map(patient => (patient.id === idToUpdate ? { ...patient, ...updatedPatient } : patient));
        saveInfo();

        res.json({ success: true });
      });

      app.delete('/api/patients/:id', (req, res) => {
        const idToDelete = req.params.id;

        patients = patients.filter(patient => patient.id !== idToDelete);
        saveInfo();

        res.json({ success: true });
      });
};

module.exports = patientRoutes;