import PropertyComparison from '../models/propertyComparison.model.js';
import WebUser from '../models/webuser.model.js';

const getAll = async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.webUserId) {
      whereClause.webUserId = req.query.webUserId;
    }

    const items = await PropertyComparison.findAll({
      where: whereClause,
      include: [{
        model: WebUser,
        as: 'webUser',
        attributes: ['id', 'name', 'email', 'number']
      }]
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const item = await PropertyComparison.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { webUserId, propertyId } = req.body;

    // Validate required fields
    if (!webUserId || !propertyId) {
      return res.status(400).json({ error: "webUserId and propertyId are required" });
    }

    // Idempotency check with explicit string cast for propertyId
    // Using String() ensures we match how DB stores it if it is STRING type
    const existing = await PropertyComparison.findOne({
      where: {
        webUserId: webUserId,
        propertyId: String(propertyId)
      }
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    // Create with explicit casting
    const item = await PropertyComparison.create({
      ...req.body,
      propertyId: String(propertyId)
    });
    res.status(201).json(item);
  } catch (error) {
    console.error("Create comparison error:", error);

    // Handle Unique Constraint specifically
    if (error.name === 'SequelizeUniqueConstraintError') {
      try {
        // Second-chance lookup in case of race condition
        const existing = await PropertyComparison.findOne({
          where: {
            webUserId: req.body.webUserId,
            propertyId: String(req.body.propertyId)
          }
        });
        if (existing) return res.status(200).json(existing);
      } catch (innerErr) {
        console.error("Error fetching existing after unique constraint:", innerErr);
      }
      return res.status(409).json({ error: "Comparison already exists" });
    }

    // Handle Validation Errors by returning specific details
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: "Validation error",
        details: error.errors?.map(e => e.message)
      });
    }

    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const [updated] = await PropertyComparison.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const item = await PropertyComparison.findByPk(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await PropertyComparison.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAll, getOne, create, update, remove };
