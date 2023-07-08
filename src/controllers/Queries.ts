//query list

//insert excel into projects
// export var queryProject = '\
//     INSERT INTO projects (no_nodin_rfsrfi,date_nodin_rfsrfi, subject_nodin_rfsrfi, status, detail_status, start_date_testing, end_date_testing, no_nodin_rfcitr, date_nodin_rfcitr, subject_nodin_rfcitr, aging_from_nodin, aging_from_testing, title_dev, pic_dev, divisi, notes_testing, testcase_amt, type_nodin, no_nodin_bo, subject_nodin_bo, date_nodin_bo, subdir_bo, title_bo, pic_bo, dev_effort, project_type, services, brand, pic_tester_1,pic_tester_2, pic_tester_3,pic_tester_4,pic_tester_5)\
//     VALUES ( :no_nodin_rfsrfi, :date_nodin_rfsrfi, :subject_nodin_rfsrfi, :status, :detail_status, :start_date_testing, :end_date_testing, :no_nodin_rfcitr, :date_nodin_rfcitr, :subject_nodin_rfcitr, :aging_from_nodin, :aging_from_testing, :title_dev, :pic_dev, :divisi, :notes_testing, :testcase_amt, :type_nodin, :no_nodin_bo, :subject_nodin_bo, :date_nodin_bo, :subdir_bo, :title_bo, :pic_bo, :dev_effort, :project_type, :services, :brand, :pic_tester_1, :pic_tester_2, :pic_tester_3, :pic_tester_4, :pic_tester_5) \
//     ON DUPLICATE KEY UPDATE \
//         no_nodin_rfsrfi = values(no_nodin_rfsrfi), \
//         date_nodin_rfsrfi = values(date_nodin_rfsrfi), \
//         subject_nodin_rfsrfi = values(subject_nodin_rfsrfi), \
//         status = values(status), \
//         detail_status = values(detail_status), \
//         start_date_testing= values(start_date_testing), \
//         end_date_testing= values(end_date_testing),\
//         no_nodin_rfcitr= values(no_nodin_rfcitr),\
//         date_nodin_rfcitr= values(date_nodin_rfcitr),\
//         subject_nodin_rfcitr= values(subject_nodin_rfcitr),\
//         aging_from_nodin= values(aging_from_nodin),\
//         aging_from_testing= values(aging_from_testing),\
//         title_dev= values(title_dev),\
//         pic_dev= values(pic_dev),\
//         divisi = values(divisi), \
//         notes_testing= values(notes_testing),\
//         testcase_amt= values(testcase_amt),\
//         type_nodin= values(type_nodin),\
//         no_nodin_bo= values(no_nodin_bo),\
//         subject_nodin_bo= values(subject_nodin_bo),\
//         date_nodin_bo= values(date_nodin_bo),\
//         subdir_bo= values(subdir_bo),\
//         title_bo= values(title_bo),\
//         pic_bo= values(pic_bo),\
//         dev_effort= values(dev_effort),\
//         project_type= values(project_type),\
//         services= values(services),\
//         brand= values(brand),\
//         pic_tester_1= values(pic_tester_1),\
//         pic_tester_2= values(pic_tester_2),\
//         pic_tester_3= values(pic_tester_3),\
//         pic_tester_4= values(pic_tester_4), \
//         pic_tester_5= values(pic_tester_5) \
//   '
export var queryProject = '\
    INSERT INTO projects (no_nodin_rfsrfi,date_nodin_rfsrfi, subject_nodin_rfsrfi, status, detail_status, start_date_testing, end_date_testing, no_nodin_rfcitr, date_nodin_rfcitr, subject_nodin_rfcitr, aging_from_nodin, aging_from_testing, title_dev, pic_dev, divisi, notes_testing, testcase_amt, type_nodin, no_nodin_bo, subject_nodin_bo, date_nodin_bo, subdir_bo, title_bo, pic_bo, dev_effort, project_type, services, brand, pic_tester_1,pic_tester_2, pic_tester_3,pic_tester_4,pic_tester_5)\
    VALUES :values ON DUPLICATE KEY UPDATE \
        no_nodin_rfsrfi = values(no_nodin_rfsrfi), \
        date_nodin_rfsrfi = values(date_nodin_rfsrfi), \
        subject_nodin_rfsrfi = values(subject_nodin_rfsrfi), \
        status = values(status), \
        detail_status = values(detail_status), \
        start_date_testing= values(start_date_testing), \
        end_date_testing= values(end_date_testing),\
        no_nodin_rfcitr= values(no_nodin_rfcitr),\
        date_nodin_rfcitr= values(date_nodin_rfcitr),\
        subject_nodin_rfcitr= values(subject_nodin_rfcitr),\
        aging_from_nodin= values(aging_from_nodin),\
        aging_from_testing= values(aging_from_testing),\
        title_dev= values(title_dev),\
        pic_dev= values(pic_dev),\
        divisi = values(divisi), \
        notes_testing= values(notes_testing),\
        testcase_amt= values(testcase_amt),\
        type_nodin= values(type_nodin),\
        no_nodin_bo= values(no_nodin_bo),\
        subject_nodin_bo= values(subject_nodin_bo),\
        date_nodin_bo= values(date_nodin_bo),\
        subdir_bo= values(subdir_bo),\
        title_bo= values(title_bo),\
        pic_bo= values(pic_bo),\
        dev_effort= values(dev_effort),\
        project_type= values(project_type),\
        services= values(services),\
        brand= values(brand),\
        pic_tester_1= values(pic_tester_1),\
        pic_tester_2= values(pic_tester_2),\
        pic_tester_3= values(pic_tester_3),\
        pic_tester_4= values(pic_tester_4), \
        pic_tester_5= values(pic_tester_5) \
  '

//get data for dashboard pie chart 
export var queryPieChartDboard = '\
    SELECT masterdivisions.division,  count(*) AS counter from projects LEFT OUTER JOIN masterdivisions ON projects.title_dev = masterdivisions.devTitle  \
    WHERE projects.date_nodin_rfcitr BETWEEN date_format(curdate(), :thnpiechart) \
    AND curdate() GROUP BY masterdivisions.division ORDER BY masterdivisions.division\
'

//get data for dashboard rfs rfi
export var queryDboardTopRFSRFI = '\
    SELECT type_nodin, count(*) as counter from projects \
    WHERE projects.date_nodin_rfsrfi between date_format(curdate(), :ytd) AND curdate() \
    GROUP BY type_nodin  \
'

//get data for dashboard rfc itr 
export var queryDboardTopRFCITR = '\
    SELECT type_nodin, count(*) as counter from projects \
    WHERE projects.date_nodin_rfcitr between date_format(curdate(), :ytd) AND curdate() \
    GROUP BY type_nodin  \
'

//get the current year dashboard line chart
// export var queryLChartYearNowDboard = '\
//     SELECT EXTRACT(YEAR FROM date_nodin_rfcitr) AS year, monthname(date_nodin_rfcitr) month, count(type_nodin) as counter from projects \
//     where projects.date_nodin_rfcitr between date_format(curdate(), :ytdnow) AND curdate() \
//     GROUP BY month(date_nodin_rfcitr) \
// '

export var queryLChartYearNowDboard = '\
    SELECT YEAR(date_nodin_rfcitr) AS year, MONTHNAME(date_nodin_rfcitr) AS month, COUNT(type_nodin) AS counter FROM projects \
    WHERE projects.date_nodin_rfcitr BETWEEN DATE_FORMAT(CURDATE(), :ytdnow) AND CURDATE() \
    GROUP BY MONTH(date_nodin_rfcitr), date_nodin_rfcitr \
'

//get the last year dashboard line chart
// export var queryLchartYearBfrDboard = '\
//     SELECT EXTRACT(YEAR FROM date_nodin_rfcitr) AS year, monthname(date_nodin_rfcitr) month, count(type_nodin) as counter from projects \
//     WHERE YEAR(date_nodin_rfcitr) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) group by month(date_nodin_rfcitr) \
// '
export var queryLchartYearBfrDboard = '\
    SELECT EXTRACT(YEAR FROM date_nodin_rfcitr) AS year, monthname(date_nodin_rfcitr) month, count(type_nodin) as counter from projects \
    WHERE YEAR(date_nodin_rfcitr) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) group by month(date_nodin_rfcitr), date_nodin_rfcitr \
'

//get the pie chart for visualization menu
export var queryPieChartDept = '\
    SELECT masterdivisions.division, masterdivisions.department,  count(*) AS counter \
    from projects LEFT OUTER JOIN masterdivisions ON projects.title_dev = masterdivisions.devTitle \
    WHERE (projects.date_nodin_rfsrfi BETWEEN date_format(curdate(), :ytddept) \
    AND curdate()) and projects.pic_dev IS NOT NULL and projects.status = "done" \
     GROUP BY masterdivisions.division, masterdivisions.department ORDER BY masterdivisions.division \
'

//get the line chart for visualization menu
// export var queryLChartDept = '\
//     SELECT masterdivisions.division, masterdivisions.department, monthname(date_nodin_rfsrfi) month, count(type_nodin) as counter \
//     FROM projects LEFT OUTER JOIN masterdivisions on projects.title_dev =masterdivisions.devTitle \
//     WHERE (projects.date_nodin_rfsrfi between date_format(curdate(), :ytdlinedept) and curdate()) and projects.pic_dev IS NOT NULL and projects.status = "done"\
//     group by masterdivisions.department, month(date_nodin_rfsrfi) order by masterdivisions.department \
// '
export var queryLChartDept = '\
    SELECT title_dev, MONTHNAME(date_nodin_rfcitr) AS month, COUNT(type_nodin) AS counter FROM projects \
    WHERE projects.date_nodin_rfcitr BETWEEN DATE_FORMAT(CURDATE(), :ytdlinedept) AND CURDATE() \
    GROUP BY title_dev, MONTH(date_nodin_rfcitr), date_nodin_rfcitr \
'

export let queryGetMasterDivision = '\
    SELECT * FROM masterdivisions \
'



// export var queryLChartDeptLast = '\
//     SELECT masterdivisions.division, masterdivisions.department, monthname(date_nodin_rfsrfi) month, count(type_nodin) as counter \
//     FROM projects LEFT OUTER JOIN masterdivisions on projects.title_dev =masterdivisions.devTitle \
//     WHERE (projects.date_nodin_rfsrfi between date_format(curdate(), :ytdlinedept) and curdate()) and masterdivisions.department = :tesdeh\
//     group by masterdivisions.department, month(date_nodin_rfsrfi) order by masterdivisions.department \
// '