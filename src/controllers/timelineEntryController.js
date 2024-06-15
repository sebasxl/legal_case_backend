const { TimelineEntry } = require('../models');

exports.createTimelineEntry = async (req, res) => {
  try {
    const timelineEntry = await TimelineEntry.create(req.body);
    res.status(201).json(timelineEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las entradas de la línea temporal
exports.getTimelineEntries = async (req, res) => {
  try {
    const entries = await TimelineEntry.findAll({
      include: [
        { model: Case, as: 'case' },
        { model: User, as: 'user' },
        { model: Category, as: 'category' }
      ]
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTimelineEntryById = async (req, res) => {
  try {
    const timelineEntry = await TimelineEntry.findByPk(req.params.id);
    if (!timelineEntry) {
      return res.status(404).json({ message: 'Timeline Entry not found' });
    }
    res.status(200).json(timelineEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener entrada de la línea temporal por ID de caso
exports.getTimelineEntriesByCaseId = async (req, res) => {
  try {
    const caseId = req.params.caseId;
    const entries = await TimelineEntry.findAll({
      where: { caseId },
      include: [
        { model: Case, as: 'case' },
        { model: User, as: 'user' },
        { model: Category, as: 'category' }
      ]
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener entrada de la línea temporal por ID de usuario
exports.getTimelineEntriesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const entries = await TimelineEntry.findAll({
      where: { userId },
      include: [
        { model: Case, as: 'case' },
        { model: User, as: 'user' },
        { model: Category, as: 'category' }
      ]
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTimelineEntry = async (req, res) => {
  try {
    const [updated] = await TimelineEntry.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Timeline Entry not found' });
    }
    const updatedTimelineEntry = await TimelineEntry.findByPk(req.params.id);
    res.status(200).json(updatedTimelineEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTimelineEntry = async (req, res) => {
  try {
    const deleted = await TimelineEntry.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Timeline Entry not found' });
    }
    res.status(200).json({ message: 'Timeline deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
