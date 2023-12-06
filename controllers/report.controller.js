/**
 * notes:
 * - nhớ import đúng model dưới đây
 */
import Model from '../models/report.model.js';
const model = new Model();

const controller = {};

// // Lấy danh sách
// controller.getAdsCategories = async (req, res) => {
//     const conditions = {};
//     const result = await model.getAll(conditions);
//     res.status(200).json(result);
// };

// // Lấy thông tin chi tiết
// controller.getAdsCategory = async (req, res) => {
//     const id = parseInt(req.params.id) || 0;
//     const adsCategory = await model.getById(id);
//     if (!adsCategory) {
//         return res.status(204).end();
//     }
//     res.status(200).json(adsCategory);
// };

// // Tạo mới
controller.postReport = async (req, res) => {
    const { surfaceId } = req.params;
    let data = req.body;

    data.surface = surfaceId;
    return res.status(201).json(data);
    const ret = await model.create(data);
    data = {
        id: ret[0],
        ...data,
    };
    res.status(201).json(data);
};


export default controller;
