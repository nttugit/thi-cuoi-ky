/**
 * notes:
 * - nhớ import đúng model dưới đây
 */
import Model from '../models/report.model.js';
const model = new Model();

const controller = {};

// // Lấy danh sách
controller.getReports = async (req, res) => {
    const conditions = {};
    const result = await model.getAll(conditions);
    res.status(200).json(result);
};


// // Tạo mới
controller.postReport = async (req, res) => {
    const { surfaceId } = req.params;
    let data = req.body;

    data.surface = parseInt(surfaceId);
    data.report_date = new Date()
    const ret = await model.create(data);
    data = {
        id: ret[0],
        ...data,
    };
    res.status(201).json(data);
};


export default controller;
