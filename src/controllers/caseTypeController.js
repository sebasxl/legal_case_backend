const { CaseType } = require('../models');

exports.createCaseType = async (req, res) => {
  try {
    const caseType = await CaseType.create(req.body);
    res.status(201).json(caseType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCaseTypes = async (req, res) => {
  try {
    const caseTypes = await CaseType.findAll();
    res.status(200).json(caseTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCaseTypeById = async (req, res) => {
  try {
    const caseType = await CaseType.findByPk(req.params.id);
    if (!caseType) {
      return res.status(404).json({ message: 'Case Type not found' });
    }
    res.status(200).json(caseType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCaseType = async (req, res) => {
  try {
    const [updated] = await CaseType.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Case Type not found' });
    }
    const updatedCaseType = await CaseType.findByPk(req.params.id);
    res.status(200).json(updatedCaseType);
  } catch (error) {
    res.status500.json({ error: error.message });
  }
};

exports.deleteCaseType = async (req, res) => {
  try {
    const deleted = await CaseType.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Case Type not found' });
    }
    res.status(200).json({ message: 'Case Type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
