import express from 'express';

import { verifyTokenAccount } from "../middlewares/verifyToken";
import { uploadFile } from '../middlewares/uploadExcel';
import { loginAccount, logoutAccount } from '../controllers/Auth';
import { uploadProject, updateDataProject, getDataByIdProject, getAllProjectsdata, getProjectTracking, getKertasKerja, getRequestorProject, filterSelectionProject } from '../controllers/ProjectController';
// import { InputLchartDept, inputDboardTop, inputLChartDboard, inputPieChartDboard, inputPieChartDept } from '../controllers/VisualizationController';
// import { getPieChartDashboard, getDboardTop, getLineChartRFCITR, getPieChartBasi, getPieChartDigitalVas, getPieChartPrepaid, getPieChartPostpaid, getLineChartPrepaid, getLineChartBasi, getLineChartDigitalVas, getLineChartPostpaid } from '../controllers/GetVisualization'
import { getAllUsers, getUserByIdAccount, getOneUser, createUser, updateUserAccountByAdmin, resetPasswordAccount, deleteUser, refreshTokenAccount, getUserManagement, resetPasswordAccountbyAdm, updateUserAccountRegular } from '../controllers/UserAccountController';
import { getAllDepartments, getOneDepartment, createDepartment, updateDepartment, deleteDepartment, getDepartmentManagement } from '../controllers/DepartmentsController';
import { getAllDivisions, getOneDivision, createDivision, updateDivision, deleteDivision, getDivisionManagement } from '../controllers/DivisionController';

const router = express.Router();


//user account & auth
router.post('/loginAccount', loginAccount);
router.delete('/logoutAccount', logoutAccount);

// WARNING: no authorization needed for these routes
router.get('/getAllUsers', getAllUsers);
router.get('/userAccount', verifyTokenAccount, getOneUser);
router.get('/userAccount/:uuid', getUserByIdAccount);
router.post('/userAccount', createUser);
router.patch('/userAccount/:uuid', updateUserAccountByAdmin);

// WARNING: is update user account regular doesnt need a body?
router.patch('/updateUserAccount/:uuid', updateUserAccountRegular);

// WARNING: anyone can change the password as long as they know the uuid, is this okay?
router.patch('/resetPasswordAccount/:uuid', resetPasswordAccount);

// WARNING: anyone can delete the user as long as they know the uuid, is this okay?
router.delete('/deleteusers/:uuid', deleteUser);
router.get('/tokenAccount', refreshTokenAccount);

// WARNING: this is getting all data of the user including the password and refresh token, without any authorication, is this okay?
router.get('/getUserManagement', getUserManagement);

// WARNING: anyone can change the password as long as they know the uuid, is this okay?
router.patch('/resetPasswordAccountAdm/:uuid', resetPasswordAccountbyAdm);

// /*
// *   Visualization Controller
// */
// router.get('/inputpiechartdboard', inputPieChartDboard);
// router.get('/inputdboardtop', inputDboardTop);
// router.get('/inputlchartdboard', inputLChartDboard);
// router.get('/inputpiechartdept', inputPieChartDept);
// router.get('/linechartdept', InputLchartDept);

// /*
// *   Get Dashboard
// */
// router.get('/piechartdashboard', getPieChartDashboard);
// router.get('/getdboardtop', getDboardTop);
// router.get('/linechartdashboard', getLineChartRFCITR);

// /*
// *   Visualization Pie Chart Department
// */
// router.get('/getpiechartbasi', getPieChartBasi);
// router.get('/getpiechartdigitalvas', getPieChartDigitalVas);
// router.get('/getpiechartpointer', getPieChartPostpaid);
// router.get('/getpiechartprepaid', getPieChartPrepaid);

// /*
// *   Get Visualization Line Chart Department
// */
// router.get('/getlinechartbasi', getLineChartBasi);
// router.get('/getlinechartdigitalvas', getLineChartDigitalVas);
// router.get('/getlinechartpointer', getLineChartPostpaid);
// router.get('/getlinechartprepaid', getLineChartPrepaid);

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
router.get('/division', getOneDivision);
router.post('/division', createDivision);
router.patch('/division', updateDivision);
router.delete('/division', deleteDivision);
router.get('/getDivisionManagement', getDivisionManagement);

/*
*   Departments Controller
*/
router.get('/getAllDepartments', getAllDepartments);
router.get('/department', getOneDepartment);
router.post('/department', createDepartment);
router.patch('/department', updateDepartment);
router.delete('/department', deleteDepartment);
router.get('/getDepartmentManagement', getDepartmentManagement);

export default router;