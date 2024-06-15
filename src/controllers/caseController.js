const { Case } = require('../models');

exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body);
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.findAll();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const caseRecord = await Case.findByPk(req.params.id);
    if (!caseRecord) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(caseRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const [updated] = await Case.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Case not found' });
    }
    const updatedCase = await Case.findByPk(req.params.id);
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deleted = await Case.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
