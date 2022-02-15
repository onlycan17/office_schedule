import { async } from "regenerator-runtime";
import Auth from "../schema/auth";
import Department from "../schema/department";
import User from "../schema/user";

export const getAuth = async(req,res) => {
    const authList = await Auth.find();
    const userList = await User.find();
    const departmentList = await Department.find();
    return res.send({pageTitle:"권한설정", authList,userList, departmentList});
}

export const postAuth = async(req,res) => {
    console.log(req.body);
    const {name,users,department} = req.body;
    try{
        const authCheck = await Auth.find({name});
        if(authCheck.length > 0){
          return res.sendStatus(404);  
        }
        const authId = await Auth.create({
            name,
            users: users ? users : null,
            department: department ? department : null,            
        });
        return res.sendStatus(200);
    }catch (error){
        const authList = await Auth.find().populate("user").populate("department");
        const userList = await User.find();
        const departmentList = await Department.find();
        console.log(error);
        return res.sendStatus(error);
    }
}

export const getAuthDetail = async(req,res) => {
    const {id} = req.params;
    const auth = await Auth.findById(id).populate("user").populate("department");
    const userList = await User.find();
    const departmentList = await Department.find();
    return res.send({pageTitle:"권한설정 상세페이지",auth,userList,departmentList});
}