/**
 * notes:
 * - nhớ import đúng model dưới đây
 */
import Model from '../models/space.model.js';
const model = new Model();

const controller = {};

// // Lấy danh sách
controller.getSpaces = async (req, res) => {
    const conditions = {};
    const result = await model.getAll(conditions);
    res.status(200).json(result);
};

export default controller;
