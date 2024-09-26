import OfficeRoom from "../schema/officeRoom";

let ObjectId = require("mongoose").Types.ObjectId;

let urlParam, urlStr, orderParam;
export const getOfficeRoom = async (req, res) => {
    console.log("getOfficeRoom!");
    let officeRoom;
    console.log(urlParam);
    const now = new Date();
    const startDateMonth = now.getFullYear() + "-" + (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1);
    const endDateMonth = now.getFullYear() + "-" + (now.getMonth() + 2 < 10 ? "0" + (now.getMonth() + 2) : now.getMonth() + 2);

    urlParam = req.url;
    officeRoom = await OfficeRoom.find({
        $or: [{start: new RegExp(startDateMonth)}, {end: new RegExp(endDateMonth)}],
    }).populate("user");

    const color = req.session.user.color;
    //console.log(color);
    return res.render("officeRoom", {
        pageTitle: "명작사무실 예약신청",
        officeRoom,
        color,
    });
};

const isUrl = (element, index) => {
    //console.log("-----isUrl------");
    //console.log(element.order);
    if (element.subMenuUrl === urlParam && element.order === Number(orderParam)) {
        return true;
    }
};

export const postAddOfficeRoom = async (req, res) => {
    const {
        title,
        description,
        url,
        start,
        end,
        allDay,
        color,
        user,
    } = req.body;
    let officeRoom;
    //console.log("~~~~~~~~~~");
    //console.log(req.body);
    //console.log(user);
    officeRoom = await OfficeRoom.create({
        title,
        description,
        url,
        start,
        end,
        allDay,
        color,
        user,
    });

    // console.log(departmentInfo);
    // const userInfo = await User.findById(user);

    // pusher.trigger("6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b", "6110e83e4d79e34e8bff0e44_612490cc21f010838f50a41b", {
    //     message: userInfo.name + "님의 차량신청예약이 등록되었습니다.",
    // });

    return res.status(201).json({id: officeRoom._id});
};

export const deleteOfficeRoom = async (req, res) => {
    //console.log("deleteOfficeRoom~~~!");
    //console.log(req.params);
    //console.log(req.body);
    const {id} = req.body;
    //console.log(id);
    const result = await OfficeRoom.findByIdAndDelete(id);
    return res.sendStatus(200);
};

export const customOfficeRoom = async (req, res) => {
    let officeRoom;
    //url = req.url;
    //console.log(req);
    //console.log(req.query);
    const {url, calendarDate, order, menuName, flag} = req.query;

    console.log(order);
    orderParam = Number(order);
    //console.log(req.query);
    //console.log(url);

    //console.log(JSON.stringify(req.session.user.department._id));
    //console.log(menuName);
    //console.log(order);
    //console.log(typeof flag);
    const flagTemp = JSON.parse(flag);
    //console.log(req?.session?.user?.department?._id);

    officeRoom = await OfficeRoom.find({
        department: req.session.user.department,
        $or: [
            {start: new RegExp(calendarDate)},
            {end: new RegExp(calendarDate)},
        ],
    }).populate("user");

    // console.log(officeRoom);
    const color = req.session.user.color;
    //console.log(color);
    return res.status(200).json({
        officeRoom,
    });
};

export const customWeekOfficeRoom = async (req, res) => {
    console.log('test~~~~~~');
    let officeRoom;
    //url = req.url;
    //console.log(req);
    const {url, startDate, endDate, order, menuName, flag} = req.query;

    console.log('startDate : '+startDate);
    console.log('endDate : '+endDate);
    //console.log(order);
    //console.log(flag);
    orderParam = Number(order);

    //console.log(req.query);
    //console.log(url);
    //console.log(req.session.user.department);
    officeRoom = await OfficeRoom.find({
        $and: [{ start: { $gte: startDate } }, { start: { $lte: endDate } },{ end: { $gte: startDate } }, { end: { $lte: endDate } }],
    }).populate("user");

    console.log(officeRoom);
    return res.status(200).json({
        officeRoom,
    });
};
