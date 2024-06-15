const { Status } = require('../models');

exports.createStatus = async (req, res) => {
  try {
    const status = await Status.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatusById = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const [updated] = await Status.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Status not found' });
    }
    const updatedStatus = await Status.findByPk(req.params.id);
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const deleted = await Status.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Status not found' });
    }
    res.status(200).json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
