const { modelNames } = require("mongoose");
const shopStatModel = require("../models/shopStat");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getStatArray = (resultObj) => {
  let resultArr = [];
  for (let i = 0; i < 12; i++) {
    let monthName = monthNames[i].toLowerCase();
    if (resultObj[monthName].visits > 0) {
      const resObj = { ...resultObj[monthName], month: monthNames[i] };
      resultArr.push(resObj);
    }
  }
  return resultArr;
};
exports.addStat = async (req, res, next) => {
  try {
    const statData = req.body;
    const result = await shopStatModel.create(statData);
    res.send({ status: "successs", stats: result });
  } catch (error) {
    next(error);
  }
};

exports.addVisit = async (req, res, next) => {
  try {
    const date = new Date();
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex].toLowerCase();
    const shopID = req.params.shopId;
    const incAttribute = `${month}.visits`;

    const $incObj = {};
    $incObj[incAttribute] = 1;

    const update = await shopStatModel.updateOne(
      { shopId: shopID },
      { $inc: $incObj }
    );
    res.send({ status: "success", data: update });
  } catch (error) {
    next(error);
  }
};

exports.addSale = async (req, res, next) => {
  try {
    const date = new Date();
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex].toLowerCase();
    const shopID = req.params.shopId;
    const incAttribute = `${month}.sales`;

    const $incObj = {};
    $incObj[incAttribute] = 1;

    const update = await shopStatModel.updateOne(
      { shopId: shopID },
      { $inc: $incObj }
    );
    res.send({ status: "success", data: update });
  } catch (error) {
    next(error);
  }
};

exports.getStat = async (req, res, next) => {
  try {
    const shopID = req.params.shopId;
    const result = await shopStatModel.find({ shopId: shopID });
    const resultArr = getStatArray(result[0]);
    res.send({
      status: "success",
      data: resultArr,
    });
  } catch (error) {
    next(error);
  }
};
