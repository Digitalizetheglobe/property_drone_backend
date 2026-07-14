import Testimonial from '../models/testimonial.model.js';

const getAll = async (req, res) => {
  try {
    const items = await Testimonial.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const item = await Testimonial.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    let image = null;
    if (req.files && req.files.length > 0) {
      const file = req.files[0];
      image = {
        filename: file.filename,
        path: `/uploads/testimonials/${file.filename}`,
        originalName: file.originalname,
        fieldName: file.fieldname
      };
    }

    const itemData = {
      ...req.body,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
      image
    };

    const item = await Testimonial.create(itemData);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let updateData = {
      ...req.body,
      isActive: req.body.isActive === 'true' || req.body.isActive === true
    };

    if (req.files && req.files.length > 0) {
      const file = req.files[0];
      updateData.image = {
        filename: file.filename,
        path: `/uploads/testimonials/${file.filename}`,
        originalName: file.originalname,
        fieldName: file.fieldname
      };
    }

    const [updated] = await Testimonial.update(updateData, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const item = await Testimonial.findByPk(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Testimonial.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAll, getOne, create, update, remove };
