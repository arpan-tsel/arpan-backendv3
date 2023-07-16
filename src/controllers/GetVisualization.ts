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

        const piechartdahsboard = await reqDiv.findAll({
            include: {
                model: masterdivision,
                as: 'masterdivision',
                required: true
            }
        });

        const result = piechartdahsboard.map((piechart) => ({
            id: piechart.id,
            division: piechart.masterdivision ? piechart.masterdivision.division : null,
            value: piechart.value
        }));

        res.json(result);

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
                                division: { [Op.like]: `%${division}%` },
                            },
                        },
                    ],
                },
            ],
        });

        // Group the piechartdivision based on division and department
        const groupedResult: Record<string, any> = {};

        piechartdivision.forEach((piechart) => {
            const { id, masterdepartment, counter } = piechart;
            const { masterdivision, department } = masterdepartment;
            const division = masterdivision.division;

            const key = `${division}-${department}`;

            if (groupedResult[key]) {
                groupedResult[key].counter += counter;
            } else {
                groupedResult[key] = { id, division, department, counter };
            }
        });

        // Convert the groupedResult object back to an array
        const mergedResult = Object.values(groupedResult);

        res.json(mergedResult);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPieChartBasi = async (req: Request, res: Response) => {
    try {
        // set req.body.division as Business Architecture and Service Integration
        req.body.division = 'Business Architecture and Service Integration'
        getPieChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}

export const getPieChartPrepaid = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Solution Management Prepaid'
        getPieChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}

export const getPieChartDigitalVas = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Solution Management Digital and VAS'
        getPieChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}

export const getPieChartPostpaid = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Solution Management Postpaid, Roaming and Interconnect'
        getPieChartDivision(req, res)

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
            attributes: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
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
                                division: division,
                            }
                        }
                    ]
                }
            ]
        })

        const result = linechartdivision.map((linechart) => ({
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
            department: linechart.masterdepartment ? linechart.masterdepartment.department : null,
            id: linechart.id,
        }));

        res.json(result)

    } catch (error) {

        res.send(error)

    }
}

export const getLineChartPrepaid = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Solution Management Prepaid'
        getLineChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}

export const getLineChartPostpaid = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Solution Management Postpaid, Roaming and Interconnect'
        getLineChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}


export const getLineChartBasi = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Architecture and Service Integration'
        getLineChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}

export const getLineChartDigitalVas = async (req: Request, res: Response) => {
    try {

        req.body.division = 'Business Solution Management Digital and VAS'
        getLineChartDivision(req, res)

    } catch (error) {

        res.send(error)

    }
}