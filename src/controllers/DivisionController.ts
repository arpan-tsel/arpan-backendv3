// Division Controller
// function :
// - getAllDivisions : get all divisions from database
// - getOneDivision : get division by id
// - createDivision : create division (crud)
// - updateDivision : update division (crud)
// - deleteDivision : delete division (crud)
// - getDivisionManagement : table division management (Read)

import { Request, Response } from "express";
import masterdivision from '../models/masterdivision'
import { Op } from 'sequelize';
import { Query } from 'express-serve-static-core';
require('dotenv').config();

//get all divisions
export const getAllDivisions = async (req: Request, res: Response) => {
    try {
        const divisions = await masterdivision.findAll({
            attributes: ['id', 'division', 'sub_directorate']
        });
        res.status(200).json(divisions)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//get division by id
export const getOneDivision = async (req: Request, res: Response) => {
    try {
        const divisions = await masterdivision.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(divisions)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//create division
export const createDivision = async (req: Request, res: Response) => {
    const { division, sub_directorate } = req.body;
    try {
        const divisions = await masterdivision.create({
            division: division,
            sub_directorate: sub_directorate
        });
        res.status(200).json({ message: "Division Created", divisions })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//update division
export const updateDivision = async (req: Request, res: Response) => {
    const { division, sub_directorate } = req.body;
    console.log(division, sub_directorate)
    try {
        const divisions = await masterdivision.update({
            division: division,
            sub_directorate: sub_directorate
        }, {
            where: {
                id: req.params.id
            }
        });
        if (divisions[0] === 0) {
            return res.status(404).json({ message: "Division Not Found" })
        }
        res.status(200).json({ message: "Division Updated", divisions })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//delete division
export const deleteDivision = async (req: Request, res: Response) => {
    try {
        const divisions = await masterdivision.destroy({
            where: {
                id: req.params.id
            }
        });
        if (divisions === 0) {
            return res.status(404).json({ message: "Division Not Found" })
        }
        res.status(200).json({ message: "Division Deleted", divisions })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//tabel division management
export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

//get division management
export const getDivisionManagement = async (req: TypedRequestQuery<{ lastId: string, limit: string, search_query: string, page: string }>, res: Response) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const totalRows = await masterdivision.count({
        where: {
            [Op.or]: [{
                division: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                sub_directorate: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await masterdivision.findAll({
        raw: true,
        where: {
            [Op.or]: [{
                division: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                sub_directorate: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'ASC']
        ]
    })

    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}