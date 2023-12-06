/**
 * notes:
 * - nhớ import đúng model dưới đây
 */
import Model from '../models/surface.model.js';
const model = new Model();

const controller = {};

// Lấy danh sách
controller.getSurfaces = async (req, res) => {
    const { spaceId } = req.params;
    const conditions = { space: spaceId };
    const result = await model.getAll(conditions);
    res.status(200).json(result);
};

export default controller;
