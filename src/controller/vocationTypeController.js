import User from "../schema/user";
import VocationType from "../schema/vocationType";
import { async } from "regenerator-runtime";
import { Mongoose } from "mongoose";

export const getVocationType = async (req, res) =>{
  const vocationTypes = await VocationType.find();
  console.log('getVocationType');
  console.log(vocationTypes);
  return res.render("vocationType", { pageTitle: "휴가정책관리 페이지", vocationTypes});
}

export const getVocationTypeAdd = async(req,res) => {
  const userList  = await User.find();
  return res.render("vocationTypeAdd",{pageTitle: "휴가정책 등록", userList});
}

export const postVocationTypeAdd = async(req, res) =>{
  const {code,name,value} = req.body;
  console.log(order);

  try {
    await VocationType.create({
      code,
      name,
      value,
    });

    return res.redirect("/vocationType");
  } catch (error) {
    return res.status(400).render("/vocationType", {
      pageTitle: "휴가정책등록",
      errorMessage: error._message,
    });
  }
}

export const deleteVocationType = async(req,res) => {
  const {id} = req.params;
  if(id){
    await VocationType.findByIdAndDelete(id);
  }else{
    return res.status(404).render("404", {
      pageTitle: "해당 값이 존재하지 않습니다.",
      errorMessage:"해당 값이 존재하지 않습니다."
    });
  }
  return res.redirect("/vocationType");
}
