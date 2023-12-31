//visualization controller
//function :
//  -inputPieChartDboard : save data for pie chart dashboard in database
//  -InputLchartDept : save data for line chart visualization in database
//  -inputDboardTop : save rfc, rfs, rfi, itr data in database
//  -inputLChartDboard : save data for line chart dashboard in database
//  -inputPieChartDept : save data for pie chart visualization in database

// import models from '../models';
// import db from '../models';
import { Op } from 'sequelize';
import { queryDboardTopRFCITR, queryDboardTopRFSRFI, queryLChartDept, queryLchartYearBfrDboard, queryLChartYearNowDboard, queryPieChartDboard, queryPieChartDept, queryGetMasterDivision } from './Queries'
import sequelize from '../config/database';

let db: any = {}
db.sequelize = sequelize

import reqDiv from '../models/reqdivs'
import deptPieChart from "../models/deptpiechart";
import linechartdepartment from '../models/linechartdepartment';
import masterdepartment from '../models/masterdepartment';

var promises: any[] = [];

//save data for pie chart dashboard in database
export const inputPieChartDboard = async () => {
    const inputdb = await db.sequelize.query(queryPieChartDboard, {
        replacements: { thnpiechart: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb)

    inputdb.forEach(function (index: any) {
        // promises.push(reqDiv.update({ value: index.counter }, {
        //     where: { division: index.division }
        // }))

        promises.push(
            reqDiv.findOrCreate({
                where: { division_id: index.division_id },
                defaults: { value: index.counter },
            }).then(([record, created]) => {
                if (!created) {
                    // Record already existed, perform the update
                    record.update({ value: index.counter });
                }
            })
        );

    });
    Promise.all(promises).then(function () {
        console.log('sukses')
    }, function (err) {
        console.log(err);
    })
}

//line chart visualization
export const InputLchartDept = async () => {

    const monthsMap: any = {
        January: "january",
        February: "february",
        March: "march",
        April: "april",
        May: "may",
        June: "june",
        July: "july",
        August: "august",
        September: "september",
        October: "october",
        November: "november",
        December: "december",
    };

    db.sequelize.query('DELETE FROM linechartdepartments;', {
        type: db.sequelize.QueryTypes.DELETE,
        raw: true
    })

    const inputdbRaw = await db.sequelize.query(queryLChartDept, {
        replacements: { ytdlinedept: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })

    inputdbRaw.forEach(function (index: any) {

        const monthKey = monthsMap[index.month];
        const updateData = { [monthKey]: index.counter };

        promises.push(
            linechartdepartment.findOrCreate({
                where: { department_id: index.department_id },
                defaults: updateData,
            }).then(([record, created]) => {
                if (!created) {
                    // Record already existed, perform the update
                    return record.update(updateData);
                }
            })
        );

    });
    Promise.all(promises).then(function () {

        console.log('sukses')

    }, function (err) {

        console.log(err);

    });
}


//dashboard rfc rfs rfi itr
export const inputDboardTop = async () => {
    const inputdb = await db.sequelize.query(queryDboardTopRFSRFI, {
        replacements: { ytd: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb)

    let stringg = " ";
    inputdb.forEach((element: any, index: any, arr: any[]) => {
        console.log('panjang', arr.length)
        stringg = stringg + `${element.type_nodin}=${element.counter}`
        if (arr.length != index + 1) {
            stringg = stringg + ', '
        } else {
            stringg = stringg + ' '
        }

    });
    console.log(stringg)

    const inputdb2 = await db.sequelize.query(queryDboardTopRFCITR, {
        replacements: { ytd: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb2)

    let stringg2 = " ";
    let stringg3 = " ";
    inputdb2.forEach((element: any, index: any, arr: any[]) => {
        stringg2 = `rfc=${arr[0].counter}`
        stringg3 = `itr=${arr[1].counter}`

    });
    console.log("string2 dan string3", stringg2, stringg3)

    try {
        const update = await db.sequelize.query('UPDATE dboardtops SET' + stringg + ',' + stringg2 + ',' + stringg3 + ' ' + 'WHERE ID=1', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        });
    } catch (err) {
        console.log(err)
    }
}

//line chart dashboard
export const inputLChartDboard = async () => {
    const inputdbCurrYearRaw = await db.sequelize.query(queryLChartYearNowDboard, {
        replacements: { ytdnow: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })

    let inputdbCurrYear: any = []
    for (let i = 0; i < inputdbCurrYearRaw.length; i++) {

        // check the inputdbCurrYearRaw, if the month is same, then push to inputdbCurrYear
        if (inputdbCurrYear.length == 0) {
            inputdbCurrYear.push(inputdbCurrYearRaw[i])
        }
        else {
            let isMonthExist = false
            for (let j = 0; j < inputdbCurrYear.length; j++) {
                if (inputdbCurrYear[j].month == inputdbCurrYearRaw[i].month) {
                    isMonthExist = true
                    inputdbCurrYear[j].counter += inputdbCurrYearRaw[i].counter;
                    break;
                }
            }
            if (!isMonthExist) {
                inputdbCurrYear.push(inputdbCurrYearRaw[i])
            }
        }
    }

    let stringg = " ";
    let stringyear = " ";
    // let stringyearerr = " ";
    inputdbCurrYear.forEach((element: any, index: any, arr: any[]) => {
        stringyear = ` year='${arr[0].year}'`
        // stringyearerr = `year='-'`
        stringg = stringg + `${element.month}=${element.counter}`
        if (arr.length != index + 1) {
            stringg = stringg + ', '
        } else {
            stringg = stringg + ' '
        }
    })

    try {
        console.log('string year', stringyear)
        const updateCurrYear = await db.sequelize.query('UPDATE rfcitrs SET' + stringyear + ',' + stringg + 'WHERE ID=1', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        });
        console.log(updateCurrYear);
    } catch (err) {
        // console.log(err)
        let stringyearerr = ` year='-'`;
        const updateCurrYear = await db.sequelize.query('UPDATE rfcitrs SET' + stringyearerr + ',' + 'January=0, February=0, March=0, April=0, June=0, May=0, July=0, August=0, September=0, October=0, November=0, December=0 WHERE ID=1', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        }
        );

    }

    const inputdbLastYearRaw = await db.sequelize.query(queryLchartYearBfrDboard, {
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    //console.log("1 thn sebelumnya", inputdbLastYearRaw);

    let inputdbLastYear: any = []
    for (let i = 0; i < inputdbLastYearRaw.length; i++) {

        // check the inputdbCurrYearRaw, if the month is same, then push to inputdbCurrYear
        if (inputdbLastYear.length == 0) {
            inputdbLastYear.push(inputdbLastYearRaw[i])
        }
        else {
            let isMonthExist = false
            for (let j = 0; j < inputdbLastYear.length; j++) {
                if (inputdbLastYear[j].month == inputdbLastYearRaw[i].month) {
                    isMonthExist = true
                    inputdbLastYear[j].counter += inputdbLastYearRaw[i].counter;
                    break;
                }
            }
            if (!isMonthExist) {
                inputdbLastYear.push(inputdbLastYearRaw[i])
            }
        }
    }

    let stLastYear = " ";
    let stringlastyear = " ";
    inputdbLastYear.forEach((element: any, index: any, arr: any[]) => {
        stringlastyear = ` year='${arr[0].year}'`
        stLastYear = stLastYear + `${element.month}=${element.counter}`
        if (arr.length != index + 1) {
            stLastYear = stLastYear + ', '
        } else {
            stLastYear = stLastYear + ' '
        }
    });

    try {
        const updateLastYear = await db.sequelize.query('UPDATE rfcitrs SET' + stringlastyear + ',' + stLastYear + 'WHERE ID=2', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        });
        console.log(updateLastYear);
    } catch (err) {
        console.log(err)
        db.sequelize.query('UPDATE rfcitrs SET January=0, February=0, March=0, April=0, June=0, May=0, July=0, August=0, September=0, October=0, November=0, December=0 WHERE ID=2', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        }
        );
    }
}

//pie chart dept
export const inputPieChartDept = async () => {
    var prepaid: any[] = [];
    const inputdb = await db.sequelize.query(queryPieChartDept, {
        replacements: { ytddept: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    });

    console.log(inputdb)

    await deptPieChart.update({ counter: null }, {
        where: {
            counter: {
                [Op.ne]: null
            }
        }
    });

    // updated the deptPieChart table with the new data based on department
    for (let i = 0; i < inputdb.length; i++) {
        await deptPieChart.findOrCreate({
            where: { department_id: inputdb[i].department_id },
            defaults: { counter: inputdb[i].counter },
        }).then(([record, created]) => {
            if (!created) {
                // Record already existed, perform the update
                record.update({ counter: inputdb[i].counter });
            }
        })
    }
}


