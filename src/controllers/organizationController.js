const { Organization } = require('../models');

exports.createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const [updated] = await Organization.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    const updatedOrganization = await Organization.findByPk(req.params.id);
    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const deleted = await Organization.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
