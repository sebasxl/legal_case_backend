const { User, Role, Organization } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, roleId, organizationId, phone, emergencyPhone, address, licenseNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
      organizationId,
      phone,
      emergencyPhone,
      address,
      licenseNumber,
    });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Role, Organization] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, { include: [Role, Organization] });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, roleId, organizationId, phone, emergencyPhone, address, licenseNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.update({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
      organizationId,
      phone,
      emergencyPhone,
      address,
      licenseNumber,
    }, {
      where: { id }
    });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.destroy({ where: { id } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
