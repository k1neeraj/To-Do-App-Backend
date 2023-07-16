const ToDoModel = require("../models/todoModel");

module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

// save
module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;

  ToDoModel.create({ text }).then((data) => {
    console.log("Add Successfully");
    console.log(data);
    res.send(data);
  });
};

// udpate
module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;

  ToDoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Update Successfully"))
    .catch((err) => console.log(err));
};

// delete
module.exports.deleteToDo = async (req, res) => {
  const { _id, text } = req.body;

  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Successfully"))
    .catch((err) => console.log(err));
};
