const express=require('express')
const {add_doctor, logindoctor, changePassword, viewdoctor, updatedoctor} = require('../../controllers/doctor/adddoctor')
const upload = require('../../middlewares/siglefile')
const { add_course, viewcourse, viewcoursebyuserid, delete_course } = require('../../controllers/doctor/createcourse')
const { add_digitalcme, viewcme, delete_digitalcme } = require('../../controllers/doctor/createdigitalcme')
const { add_digitalcme_questionbank, view_digitalcme_questionbank, delete_question } = require('../../controllers/doctor/createquestionbank')
const { add_doctor_subadmin, view_subadmin, delete_subadmin } = require('../../controllers/doctor/subadmin')


const router=express.Router()

// ======================================adding docotr routes===========================================

router.post('/adddoctor',upload.any('profile_pic'), add_doctor)
router.put('/updatedoctor/:_id',upload.any('profile_pic'),updatedoctor)
router.get('/getalldoctor',viewdoctor)
router.post('/login',logindoctor)
router.post('/changedpassword',changePassword)



// ===========================creating course route===============================================

router.post('/createcourse',upload.any('course_image'), add_course)
router.get('/getcourse',viewcourse)
router.get('/getcoursebyuserid/:user_id',viewcoursebyuserid)
router.delete('/deletecourse/:_id',delete_course)


//=========================== digital cme routes==========================================

router.post('/createdigitalcme',upload.any('image_gallary'), add_digitalcme)
router.get('/getcme',viewcme)
router.delete('/deletecme/:_id',delete_digitalcme)


//======================create digital cme question bank routes==========================================

router.post('/createdigitalcmequestionbank',upload.any('image_gallary'), add_digitalcme_questionbank)
router.get('/getdigitalcmequestionbank',view_digitalcme_questionbank)
router.delete('/deletequestion/:_id',delete_question)

//========================= sub admin routes===================================================

router.post('/createsubadmin', add_doctor_subadmin)
router.get('/getsubadmindetails',view_subadmin)
router.delete('/deletesubadmin/:_id',delete_subadmin)


module.exports=router