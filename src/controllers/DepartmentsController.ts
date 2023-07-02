// Department Controller
// function :
// - getAllDepartments : get all departments from database
// - getOneDepartment : get department by id
// - createDepartment : create department (crud)
// - updateDepartment : update department (crud)
// - deleteDepartment : delete department (crud)
// - getDepartmentManagement : table department management (Read)

import { Request, Response } from "express";
import masterdepartment from '../models/masterdepartment'
import { Op } from 'sequelize';
import { Query } from 'express-serve-static-core';
require('dotenv').config();

//get all departments
export const getAllDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await masterdepartment.findAll({
            attributes: ['id', 'department', 'divison']
        });
        res.json(departments)
    } catch (error) {
        res.status(500).json(error);
    }
}

//get department by id
export const getOneDepartment = async (req: Request, res: Response) => {
    try {
        const departments = await masterdepartment.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(departments)
    } catch (error) {
        console.log(error);
    }
}

//create department
export const createDepartment = async (req: Request, res: Response) => {
    const { department, divison } = req.body;
    try {
        const departments = await masterdepartment.create({
            department: department,
            divison: divison
        });
        res.json(departments)
    } catch (error) {
        console.log(error);
    }
}

//update department
export const updateDepartment = async (req: Request, res: Response) => {
    const { department, divison } = req.body;
    try {
        const departments = await masterdepartment.update({
            department: department,
            divison: divison
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json(departments)
    } catch (error) {
        console.log(error);
    }
}


//delete department
export const deleteDepartment = async (req: Request, res: Response) => {
    try {
        const departments = await masterdepartment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(departments)
    } catch (error) {
        console.log(error);
    }
}

//tabel department management
export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

//get department management
export const getDepartmentManagement = async (req: TypedRequestQuery<{ lastId: string, limit: string, search_query: string, page: string }>, res: Response) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const totalRows = await masterdepartment.count({
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
    const result = await masterdepartment.findAll({
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
