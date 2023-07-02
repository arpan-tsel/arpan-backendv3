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
        res.json(divisions)
    } catch (error) {
        res.status(500).json(error);
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
        res.json(divisions)
    } catch (error) {
        console.log(error);
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
        res.json(divisions)
    } catch (error) {
        console.log(error);
    }
}

//update division
export const updateDivision = async (req: Request, res: Response) => {
    const { division, sub_directorate } = req.body;
    try {
        const divisions = await masterdivision.update({
            division: division,
            sub_directorate: sub_directorate
        }, {
            where: {
                division: req.params.id
            }
        });
        res.json(divisions)
    } catch (error) {
        console.log(error);
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
        res.json(divisions)
    } catch (error) {
        console.log(error);
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
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                username: {
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
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                username: {
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