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
import masterdivision from '../models/masterdivision'
import { Op, where } from 'sequelize';
import { Query } from 'express-serve-static-core';
require('dotenv').config();

//get all departments
export const getAllDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await masterdepartment.findAll({
            attributes: ['id', 'department', 'devTitle'],
            include: [
                {
                    model: masterdivision,
                    attributes: ['division'],
                    required: true,
                }
            ]
        });

        if (!departments) {
            return res.status(404).json({ message: "Departments not found" })
        }

        const formattedDepartments = departments.map((department) => ({
            id: department.id,
            division: department.masterdivision.division,
            department: department.department,
            devTitle: department.devTitle,
        }));

        res.status(200).json(formattedDepartments)

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//get department by id
export const getOneDepartment = async (req: Request, res: Response) => {
    try {
        const departments = await masterdepartment.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: masterdivision,
                    required: true,
                    attributes: ['division']
                }
            ]
        });

        if (!departments) {
            return res.status(404).json({ message: "Department Not Found" })
        }

        const formattedDepartments = {
            id: departments!.id,
            division: departments!.masterdivision.division,
            department: departments!.department,
            devTitle: departments!.devTitle,
        };

        res.status(200).json(formattedDepartments)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//create department
export const createDepartment = async (req: Request, res: Response) => {
    const { department, division, devTitle } = req.body;
    try {
        const divisions = await masterdivision.findOne({
            where: {
                division: division
            }
        });
        // if division not found
        if (!divisions) {
            return res.status(404).json({ message: "Division Not Found" })
        }

        const departments = await masterdepartment.create({
            division_id: divisions!.id,
            department: department,
            devTitle: devTitle,
        });
        res.status(200).json({ message: "Department Created", departments })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//update department
export const updateDepartment = async (req: Request, res: Response) => {
    const { department, division, devTitle } = req.body;
    try {
        const divisions = await masterdivision.findOne({
            where: {
                division: division
            }
        });
        // if division not found
        if (!divisions) {
            return res.status(404).json({ message: "Division Not Found" })
        }

        const departments = await masterdepartment.update({
            division_id: divisions!.id,
            department: department,
            devTitle: devTitle,
        }, {
            where: {
                id: req.params.id
            }
        });

        // if department not found
        if (departments[0] === 0) {
            return res.status(404).json({ message: "Department Not Found" })
        }

        res.status(200).json({ message: "Department Updated", departments })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
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
        // if department not found
        if (departments === 0) {
            return res.status(404).json({ message: "Department Not Found" })
        }
        res.status(200).json({ message: "Department Deleted", departments })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
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

    const { count, rows: departments } = await masterdepartment.findAndCountAll({
        where: {
            [Op.or]: [{
                '$masterdivision.division$': {  // Using the association alias to access the division table
                    [Op.like]: '%' + search + '%'
                }
            }, {
                department: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                devTitle: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        },
        offset: offset,
        limit: limit,
        include: [
            { model: masterdivision, as: 'masterdivision', required: true } // Include the associated division model with alias 'masterdivision'
        ],
        order: [
            ['id', 'ASC']
        ]
    });

    const totalPage = Math.ceil(count / limit);

    const result = departments.map((department) => ({
        id: department.id,
        division: department.masterdivision ? department.masterdivision.division : null,
        department: department.department,
        devTitle: department.devTitle,
    }));


    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: count,
        totalPage: totalPage
    });
}
