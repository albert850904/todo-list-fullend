const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(201).json({ tasks, amounts: tasks.length });
//     // res
//     //   .status(201)
//     //   通常使用axios 時，他會自己幫你加data，前端就會變成 data.data.tasks
//     //   .json({ status: "success", data: { tasks, amouts: tasks.length } });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// customer wrapper
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks, amounts: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// 但是如果我們在id多加or刪除一些來test, 就會出現casting error
// 因為與mongoose在查看的character 不符合
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    // 如果有correct id syntax, 但是找不到東西，會跑來這裡
    // return res.status(404).json({ msg: `No task for ID: ${taskID}` });
    return next(createCustomError(`No task for ID: ${taskID}`, 404)); // 用next 傳去error handling middleware
  }

  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task for ID: ${taskID}`, 404));
  }
  // res.status(200).json({ task });
  // 因為delete的人其實只在意有沒有成功，因此只要send() 即可
  // res.status(200).send();
  // 或是告知有沒有success
  res.status(200).json({ task: null, status: "success" });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  }); // 傳入match condition

  if (!task) {
    return next(createCustomError(`No task for ID: ${taskID}`, 404));
  }

  // default update後我們是會拿到舊的，要pass-in options才會讓他吐回新的
  // options object 也讓patch request 能夠正確執行validator
  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
