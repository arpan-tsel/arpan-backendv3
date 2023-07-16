//Get Visualization
// get all data from database to display in visualization and dashboard menu
// function:
//  -getPieChartDashboard : display pie chart in dashboard
//  -getPieChartBasi : display pie chart in visualization
//  -getPieChartPrepaid
//  -getPieChartDigitalVas
//  -getPieChartPostpaid
//  -getLineChartRFCITR : display line chart in dashboard
//  -getDboardTop : display RFC,RFS,RFI,ITR in dashboard
//  -getLineChartPrepaid
//  -getLineChartPostpaid
//  -getLineChartBasi
//  -getLineChartDigitalVas

// import models from '../models';
import { Request, Response } from "express";
import { Op } from 'sequelize';

import reqDiv from '../models/reqdivs'
import deptPieChart from "../models/deptpiechart";
import rfcitrs from "../models/rfcitrs";
import dboardtop from "../models/dboardtop";
import linechartdepartment from "../models/linechartdepartment";
import masterdivision from "../models/masterdivision";
import masterdepartment from "../models/masterdepartment";


export const getPieChartDashboard = async (req: Request, res: Response) => {
    try {
        const piechartdahsboard = await reqDiv.findAll()
        res.json(piechartdahsboard)
    } catch (error) {
        res.send(error)
    }
}

export const getPieChartDivision = async (req: Request, res: Response) => {

    const { division } = req.body;
    try {
        const piechartdivision = await deptPieChart.findAll({
            include: [
                {
                    model: masterdepartment,
                    as: 'masterdepartment',
                    required: true,
                    include: [
                        {
                            model: masterdivision,
                            as: 'masterdivision',
                            required: true,
                            where: {
                                division: { [Op.like]: `%${division}%` }
                            }
                        }
                    ]
                }
            ]
        });

        const result = piechartdivision.map((piechart) => ({
            id: piechart.id,
            division: piechart.masterdepartment ? piechart.masterdepartment.masterdivision.division : null,
            department: piechart.masterdepartment ? piechart.masterdepartment.department : null,
            counter: piechart.counter,
        }));

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getPieChartBasi = async (req: Request, res: Response) => {
    try {
        const piechartbasi = await deptPieChart.findAll({
            where: {
                division: 'Business Architecture and Service Integration'

            }
        })
        res.json(piechartbasi)
    } catch (error) {
        res.send(error)
    }
}

export const getPieChartPrepaid = async (req: Request, res: Response) => {
    try {
        const piechartprepaid = await deptPieChart.findAll({
            where: {
                division: 'Business Solution Management Prepaid'
            }
        })
        res.json(piechartprepaid)
    } catch (error) {
        res.send(error)
    }
}

export const getPieChartDigitalVas = async (req: Request, res: Response) => {
    try {
        const piechartDigitalVas = await deptPieChart.findAll({
            where: {
                division: 'Business Solution Management Digital and VAS'
            }
        })
        res.json(piechartDigitalVas)
    } catch (error) {
        res.send(error)
    }
}

export const getPieChartPostpaid = async (req: Request, res: Response) => {
    try {
        const piechartPostpaid = await deptPieChart.findAll({
            where: {
                division: 'Business Solution Management Postpaid, Roaming and Interconnect'
            }
        })
        res.json(piechartPostpaid)
    } catch (error) {
        res.send(error)
    }
}

export const getLineChartRFCITR = async (req: Request, res: Response) => {
    try {
        const linechartdashboard = await rfcitrs.findAll({
            where: {
                [Op.or]: [{
                    id: 1
                },
                {
                    id: 2
                }
                ]
            },
            attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'year']
        })
        res.json(linechartdashboard)
    } catch (error) {
        res.send(error)
    }
}

export const getDboardTop = async (req: Request, res: Response) => {
    try {
        const topdboard = await dboardtop.findOne({
            where: {
                id: 1
            }
        })
        res.send(topdboard)
    } catch (error) {
        res.send(error)
    }
}

export const getLineChartDivision = async (req: Request, res: Response) => {
    const { division } = req.body
    try {
        const linechartdivision = await linechartdepartment.findAll({
            include: [
                {
                    model: masterdepartment,
                    as: 'masterdepartment',
                    required: true,
                    include: [
                        {
                            model: masterdivision,
                            as: 'masterdivision',
                            required: true,
                            where: {
                                division: { [Op.like]: `%${division}%` }
                            }
                        }
                    ]
                }
            ],
            // attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'department']
        })

        const result = linechartdivision.map((linechart) => ({
            id: linechart.id,
            division: linechart.masterdepartment ? linechart.masterdepartment.masterdivision.division : null,
            department: linechart.masterdepartment ? linechart.masterdepartment.department : null,
            january: linechart.january,
            february: linechart.february,
            march: linechart.march,
            april: linechart.april,
            may: linechart.may,
            june: linechart.june,
            july: linechart.july,
            august: linechart.august,
            september: linechart.september,
            october: linechart.october,
            november: linechart.november,
            december: linechart.december,
        }));
        res.json(result)
    } catch (error) {
        res.send(error)
    }
}

export const getLineChartPrepaid = async (req: Request, res: Response) => {
    try {
        const linechartprepaid = await linechartdepartment.findAll({
            where: {
                division: 'Business Solution Management Prepaid'
            },
            attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'department']
        })
        console.log(linechartprepaid)
        res.json(linechartprepaid)
    } catch (error) {
        res.send(error)
    }
}

export const getLineChartPostpaid = async (req: Request, res: Response) => {
    try {
        const linechartprepaid = await linechartdepartment.findAll({
            where: {
                division: 'Business Solution Management Postpaid, Roaming and Interconnect'

            },
            attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'department']
        })
        console.log(linechartprepaid)
        res.json(linechartprepaid)
    } catch (error) {
        res.send(error)
    }
}


export const getLineChartBasi = async (req: Request, res: Response) => {
    try {
        const linechartprepaid = await linechartdepartment.findAll({
            where: {
                division: 'Business Architecture and Service Integration'
            },
            attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'department']
        })
        res.json(linechartprepaid)
    } catch (error) {
        res.send(error)
    }
}

export const getLineChartDigitalVas = async (req: Request, res: Response) => {
    try {
        const linechartprepaid = await linechartdepartment.findAll({
            where: {
                division: 'Business Solution Management Digital and VAS'
            },
            attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'department']
        })
        res.json(linechartprepaid)
    } catch (error) {
        res.send(error)
    }
}