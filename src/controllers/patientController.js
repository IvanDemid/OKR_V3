const dbService = require('../services/dbService');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await dbService.readDB();
    res.json(patients);
  } catch (err) {
    res.status(500).send('Ошибка при чтении данных');
  }
};

exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patients = await dbService.readDB();
    const patient = patients.find(patient => patient.id === id);
    if (!patient) return res.status(404).send('Пациент не найден');
    res.json(patient);
  } catch (err) {
    res.status(500).send('Ошибка при чтении данных');
  }
};

exports.addPatient = async (req, res) => {
  const newPatient = req.body;
  if (!newPatient.id || !newPatient.name || newPatient.days === undefined || !newPatient.createdAT) {
    return res.status(400).send('Не хватает данных для добавления пациента');
  }

  try {
    const patients = await dbService.readDB();
    patients.push(newPatient);
    await dbService.writeDB(patients);
    res.status(201).send('Пациент добавлен');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const updatedPatient = req.body;

  try {
    const patients = await dbService.readDB();
    const patientIndex = patients.findIndex(patient => patient.id === id);
    if (patientIndex === -1) return res.status(404).send('Пациент не найден');

    patients[patientIndex] = { ...patients[patientIndex], ...updatedPatient };
    await dbService.writeDB(patients);
    res.send('Информация о пациенте обновлена');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};

exports.updateDays = async (req, res) => {
  const { id } = req.params;
  const { days } = req.body;

  if (days === undefined) {
    return res.status(400).send('Не указано количество дней для изменения');
  }

  try {
    const patients = await dbService.readDB();
    const patientIndex = patients.findIndex(patient => patient.id === id);
    if (patientIndex === -1) return res.status(404).send('Пациент не найден');

    patients[patientIndex].days = days;
    await dbService.writeDB(patients);
    res.send('Количество дней пациента обновлено');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patients = await dbService.readDB();
    const newPatientsList = patients.filter(patient => patient.id !== id);
    if (newPatientsList.length === patients.length) {
      return res.status(404).send('Пациент не найден');
    }

    await dbService.writeDB(newPatientsList);
    res.send('Пациент удален');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};
