const { Attachment } = require('../models');

exports.createAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.create(req.body);
    res.status(201).json(attachment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.findAll();
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttachmentById = async (req, res) => {
  try {
    const attachment = await Attachment.findByPk(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttachment = async (req, res) => {
  try {
    const [updated] = await Attachment.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    const updatedAttachment = await Attachment.findByPk(req.params.id);
    res.status(200).json(updatedAttachment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttachment = async (req, res) => {
  try {
    const deleted = await Attachment.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
