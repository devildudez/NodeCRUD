import { Request, Response } from "express";
import ChildModel from "../model/child.model";
import { CreateChildInput, ParamsInput, UpdateChildInput } from "./child.schema";

export const createChildController = async (req: Request<{}, {}, CreateChildInput>, res: Response) => {
    try {
        const child = await ChildModel.create(req.body);
        res.status(201).json({ status: "success", data: { child } });
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateChildController = async (
    req: Request<UpdateChildInput["params"], {}, UpdateChildInput["body"]>,
    res: Response,
) => {
    try {
        const [updated] = await ChildModel.update(req.body, { where: { id: req.params.childId } });
        if (!updated) return res.status(404).json({ status: "fail", message: "Child record not found" });
        const child = await ChildModel.findByPk(req.params.childId);
        res.status(200).json({ status: "success", data: { child } });
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const findChildController = async (req: Request<ParamsInput>, res: Response) => {
    try {
        const child = await ChildModel.findByPk(req.params.childId);
        if (!child) return res.status(404).json({ status: "fail", message: "Child record not found" });
        res.status(200).json({ status: "success", data: { child } });
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const findAllChildrenController = async (req: Request, res: Response) => {
    const page = Math.max(1, Number.parseInt(String(req.query.page ?? "1"), 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(String(req.query.limit ?? "10"), 10) || 10));
    try {
        const { count, rows: children } = await ChildModel.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            order: [["lastName", "ASC"], ["firstName", "ASC"]],
        });
        res.status(200).json({ status: "success", results: children.length, total: count, page, limit, children });
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const deleteChildController = async (req: Request<ParamsInput>, res: Response) => {
    try {
        const deleted = await ChildModel.destroy({ where: { id: req.params.childId } });
        if (!deleted) return res.status(404).json({ status: "fail", message: "Child record not found" });
        res.status(204).json();
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
