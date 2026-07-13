import SavedProperty from '../models/savedProperty.model.js';
import WebUser from '../models/webuser.model.js';

const getAll = async (req, res) => {
  try {
    const items = await SavedProperty.findAll({
      include: [{ model: WebUser }]
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const item = await SavedProperty.findByPk(req.params.id, {
      include: [{ model: WebUser }]
    });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { webUserId } = req.body;
    if (webUserId) {
      const userExists = await WebUser.findByPk(webUserId);
      if (!userExists) {
        return res.status(401).json({ error: "User session is invalid. Please log in again." });
      }
    }
    const item = await SavedProperty.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const [updated] = await SavedProperty.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const item = await SavedProperty.findByPk(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await SavedProperty.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAll, getOne, create, update, remove };
