import User from "../schema/user";
import Department from "../schema/department";
import { async } from "regenerator-runtime";
import { Mongoose } from "mongoose";

export const getDepartment = async (req, res) =>{
  const departments = await Department.find().populate("user");
  console.log('getDepartment');
  console.log(departments);
  return res.render("department", { pageTitle: "부서관리 페이지", departments});
}

export const getDepartmentAdd = async(req,res) => {
  const userList  = await User.find();
  return res.render("departmentAdd",{pageTitle: "부서등록", userList});
}

export const postDepartmentAdd = async(req, res) =>{
  const {name,user} = req.body;
  const check = await Department.findOne({name});
  console.log(check);
  if(check){
    const departments = await Department.find().populate("user");
    const userList  = await User.find();
    return res.status(404).render("department",{
      pageTitle: "부서등록",
      errorMessage: "이미 등록된 부서명 입니다.",
      departments,
      userList,
    });   
  }
  try {
    const department = await Department.create({
      name,
      user: user ? user : null,
    });
    if(user){
      await User.findByIdAndUpdate(user,{department:department._id});
    }
    return res.redirect("/department");
  } catch (error) {
    return res.status(400).render("/department", {
      pageTitle: "부서등록",
      errorMessage: error._message,
    });
  }
}

export const deleteDepartment = async(req,res) => {
  const {id} = req.params;
  let depId;
  if(id){
    depId = await Department.findByIdAndDelete(id);  
  }else{
    return res.status(404).render("404", {
      pageTitle: "부서가 존재하지 않습니다.",
      errorMessage:"부서가 존재하지 않습니다."
    });
  }
  await User.updateMany({department:depId},{$set:{department:null}});
  return res.redirect("/department");
}

export const getDepartmentDetail = async(req,res) => {
  const {id} = req.params;
  //console.log(req.params);
  const detail = await Department.findById(id).populate("user");
  const userList  = await User.find();
  return res.render("departmentDetail",{pageTitle:"부서관리 상세페이지",detail,userList});
}

export const postDepartmentDetail = async(req,res)=> {
  const {name,userId} = req.body;
  const {id} = req.params;
  console.log(id);
  console.log('test!');
  console.log(req.body);
    if(!name){
      return res.status(404).render("404", {
        pageTitle: "부서명이 존재하지 않습니다."
    });
  }
  try{
    const departmentObj = await Department.findByIdAndUpdate(id,{name});
    //console.log('departmentDetail - post - - - ');
    //console.log(departmentObj);
    const check = await Department.find({_id:id,user:{$eq:userId}});
    //console.log('checkValue--------------');
    //console.log(check[0].user.length);
    //console.log(check.length);
    //console.log('checkValue--------------');
    if(check.length > 0){
      return res.redirect("/departmentDetail/"+id);  
    }else{
      const userObj = await User.findByIdAndUpdate(userId,{department:departmentObj._id});
      departmentObj.user.push(userObj._id);
      departmentObj.save();
      return res.redirect("/departmentDetail/"+id);
    }   
  }catch (error){
    const detail = await Department.findById(id).populate("user");
    const userList  = await User.find();
    return res.status(400).render("departmentDetail", {
      pageTitle: "부서등록상세페이지",
      errorMessage: error._message,
      detail,
      userList,
    });
  }
}

export const getDeleteDepartmentDetail = async(req,res) => {
  const {departmentId,userId} = req.params;
  console.log(req.params);
  try{
    const user = await User.findByIdAndUpdate(userId,{department: null}); 
    console.log(user);
    const department = await Department.findById(departmentId);
    department.user.pull(userId);
    department.save();
    console.log(department);
    return res.redirect("/departmentDetail/"+departmentId);
  }catch (error){
    const detail = await Department.findById(departmentId).populate("user");
    const userList  = await User.find();
    return res.status(400).render("departmentDetail", {
      pageTitle: "부서등록상세페이지",
      errorMessage: error._message,
      detail,
      userList,
    });
  }
}