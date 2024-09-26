import Meal from "../schema/meal";
import User from "../schema/user";
import File from "../schema/file";
import fs from "fs";
import iconv from "iconv-lite";
import Comment from "../schema/comment";
import { dropbox } from "../middleware";
import pusher from "../pusher";

let ObjectId = require("mongoose").Types.ObjectId;

export const getMeal = async (req, res) => {
  //console.log("getMeal!");
  let meal;
  //console.log(urlParam);
  const now = new Date();
  const dateMonth =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
  
    meal = await Meal.find({
      $or: [{ start: new RegExp(dateMonth) }, { end: new RegExp(dateMonth) }],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  //console.log(typeof meal);
  const color = req.session.user.color;
  //console.log(color);
  return res.render("meal", {
    pageTitle: "명작 식사표",
    meal,
    color,
  });
};

export const postAddMeal = async (req, res) => {
  const { title, description, start, end, allDay, color, user } = req.body;
  console.log('----param info-------');
  console.log(req.body);
  console.log(description);
  const meal = await Meal.create({
    title,
    description,
    start,
    end,
    allDay,
    color,
    user,
  });

  pusher.trigger("mealAllPush", "mealAllPush", {
    message: "[명작식단표] 오늘의 메뉴가 등록되었습니다.",
  });
  //const userInfo = await User.findById(user);
  //console.log(filePath);
  return res
    .status(201)
    .json({ id: meal._id});
};


export const deleteMeal = async (req, res) => {
  //console.log("deleteMeal~~~!");
  //console.log(req.params);
  //console.log(req.body);
  const { id } = req.body;
  //console.log(id);
  const result = await Meal.findByIdAndDelete(id);
  return res.sendStatus(200);
};

export const customMeal = async (req, res) => {
  let meal;
  //url = req.url;
  //console.log(req);
  const { url, calendarDate, order, menuName, flag } = req.query;
  
    meal = await Meal.find({
      $or: [
        { start: new RegExp(calendarDate) },
        { end: new RegExp(calendarDate) },
      ],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  const color = req.session.user.color;
  return res.status(200).json({
    meal,
  });
};

export const customWeekMeal = async (req, res) => {
  let meal;
  const { url, startDate, endDate, order, menuName, flag } = req.query;
  
    meal = await Meal.find({
      $or: [{ start: { $gte: startDate } }, { start: { $lte: endDate } }],
      $or: [{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
    })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("file");
  // console.log(Meal);
  return res.status(200).json({
    meal,
  });
};

export const addPostMealComment = async (req, res) => {
  const { commentText, mealId, user } = req.body;
  let userOJ;
  if (commentText) {
    const comment = await Comment.create({
      text: commentText,
      user,
      meal: mealId,
    });
    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.sendStatus(404);
    }
    meal.comments.push(comment._id);
    meal.save();
    
    userOJ = await User.findById(user);
  }
  return res.status(200).json({ id: mealId, user: userOJ });
};

export const editPatchMealComment = async (req, res) => {
  console.log(req.body);
  const { commentId, commentText, mealId, user } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndUpdate(commentId, { text: commentText });
  let userOJ = await User.findById(user);
  return res.status(200).json({ id: mealId, user: userOJ });
};

export const deleteMealComment = async (req, res) => {
  const { commentId } = req.body;
  const comment = await Comment.findById(commentId);
  //console.log(comment);
  if (!comment) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndDelete(commentId);
  res.sendStatus(200);
};
