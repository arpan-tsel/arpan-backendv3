import express from 'express';

import { verifyTokenAccount } from "../middlewares/verifyToken";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken";
import { uploadFile } from '../middlewares/uploadExcel';
import { loginAccount, logoutAccount } from '../controllers/Auth';
import { uploadProject, updateDataProject, getDataByIdProject, getAllProjectsdata, getProjectTracking, getKertasKerja, getRequestorProject, filterSelectionProject } from '../controllers/ProjectController';
import { InputLchartDept, inputDboardTop, inputLChartDboard, inputPieChartDboard, inputPieChartDept } from '../controllers/VisualizationController';
import { getPieChartDashboard, getDboardTop, getLineChartRFCITR, getPieChartBasi, getPieChartDigitalVas, getPieChartPrepaid, getPieChartPostpaid, getLineChartPrepaid, getLineChartBasi, getLineChartDigitalVas, getLineChartPostpaid, getPieChartDivision, getLineChartDivision } from '../controllers/GetVisualization'
import { getAllUsers, getUserByIdAccount, getOneUser, createUser, updateUserAccountByAdmin, resetPasswordAccount, deleteUser, refreshTokenAccount, getUserManagement, resetPasswordAccountbyAdm, updateUserAccountRegular } from '../controllers/UserAccountController';
import { getAllDepartments, getOneDepartment, createDepartment, updateDepartment, deleteDepartment, getDepartmentManagement } from '../controllers/DepartmentsController';
import { getAllDivisions, getOneDivision, createDivision, updateDivision, deleteDivision, getDivisionManagement } from '../controllers/DivisionController';

const router = express.Router();


//user account & auth
router.post('/loginAccount', loginAccount);
router.delete('/logoutAccount', logoutAccount);
router.get('/getAllUsers', verifyRefreshToken, getAllUsers);
router.get('/userAccount', verifyTokenAccount, getOneUser);
router.get('/userAccount/:uuid', getUserByIdAccount);
router.post('/userAccount', createUser);
router.patch('/userAccount/:uuid', verifyRefreshToken, updateUserAccountByAdmin);
router.patch('/updateUserAccount/:uuid', updateUserAccountRegular);
router.patch('/resetPasswordAccount/:uuid', resetPasswordAccount);
router.delete('/deleteusers/:uuid', deleteUser);
router.get('/tokenAccount', refreshTokenAccount);
router.get('/getUserManagement', getUserManagement);
router.patch('/resetPasswordAccountAdm/:uuid', verifyRefreshToken, resetPasswordAccountbyAdm);

// /*
// *   Visualization Controller
// */
router.get('/inputpiechartdboard', inputPieChartDboard);
router.get('/inputdboardtop', inputDboardTop);
router.get('/inputlchartdboard', inputLChartDboard);
router.get('/inputpiechartdept', inputPieChartDept);
router.get('/linechartdept', InputLchartDept);

// /*
// *   Get Dashboard
// */
router.get('/piechartdashboard', getPieChartDashboard);
router.get('/getdboardtop', getDboardTop);
router.get('/linechartdashboard', getLineChartRFCITR);

// /*
// *   Visualization Pie Chart Department
// */
router.get('/getpiechartbasi', getPieChartBasi);
router.get('/getpiechartdigitalvas', getPieChartDigitalVas);
router.get('/getpiechartpointer', getPieChartPostpaid);
router.get('/getpiechartprepaid', getPieChartPrepaid);
router.post('/getpiechartdivision', getPieChartDivision);

// /*
// *   Get Visualization Line Chart Department
// */
router.get('/getlinechartbasi', getLineChartBasi);
router.get('/getlinechartdigitalvas', getLineChartDigitalVas);
router.get('/getlinechartpointer', getLineChartPostpaid);
router.get('/getlinechartprepaid', getLineChartPrepaid);
router.post('/getlinechartdivision', getLineChartDivision);

// /*
// *   Project Controller
// */
router.post("/uploadproject", uploadFile.single("file"), uploadProject);
router.get("/getAllProject", getAllProjectsdata);
router.get("/projectTracking", getProjectTracking);
router.get('/requestorProject', getRequestorProject);
router.get('/datasProject/:id_project', getDataByIdProject);
router.patch('/datasProject/:id_project', updateDataProject);
router.get('/filterselectionproject', filterSelectionProject);
router.get('/kertaskerja', getKertasKerja);

/*
*   Divisions Controller
*/
router.get('/getAllDivisions', getAllDivisions);
router.get('/division/:id', getOneDivision);
router.post('/division', createDivision);
router.patch('/division/:id', updateDivision);
router.delete('/division/:id', deleteDivision);
router.get('/getDivisionManagement', getDivisionManagement);

/*
*   Departments Controller
*/
router.get('/getAllDepartments', getAllDepartments);
router.get('/department/:id', getOneDepartment);
router.post('/department', createDepartment);
router.patch('/department/:id', updateDepartment);
router.delete('/department/:id', deleteDepartment);
router.get('/getDepartmentManagement', getDepartmentManagement);

export default router;