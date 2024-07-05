import React, { useState } from "react";

const ToDoApp = () => {
  const [inputData, setInputData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [data, setData] = useState([
    {
      id: 101,
      inputData: "Hello World",
      checked: false,
    },
  ]);

  // handleCheckBoxChnage
  const handleCheckBoxChnage = (id) => {
    console.log("clicked...", id);
    setData((prevData) =>
      prevData.map((item, index) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // onSubmit.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        setData(
          data.map((item) =>
            item.id === editId ? { ...item, inputData } : item
          )
        );
        setEditId(null);
      } else {
        const newData = {
          id: Date.now(),
          inputData: inputData,
          checked: false,
        };
        setData([...data, newData]);
        console.log([...data, newData]);
      }

      // clear input filed value after submitting the form.
      setInputData("");
    } catch (error) {
      console.log("Error during submitting the todo apps :: ", error);
    }
  };

  // handleDelete.
  const handleDelete = (id) => {
    const itemToDelete = data.find((item) => item.id === id);
    const toDoName = itemToDelete ? itemToDelete.inputData : "This Item";
    const isConfirm = window.confirm(
      `Are you sure you want to delete ? ${toDoName}`
    );

    if (isConfirm) {
      console.log("yes", id);
      const deletedData = data.filter((item) => item.id !== id);
      setData(deletedData);
    }
  };

  // handleEdit.
  const handleEdit = (id) => {
    console.log("HandleEdit :: ", id);
    setEditId(id);
    const editFields = data.find((item) => item.id === id);
    setInputData(editFields.inputData);
    console.log(editFields.inputData);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="w-full p-6 bg-slate-500 text-3xl text-white font-bold text-center">
          ToDoApp in React.JS
        </h1>
        <form
          className="w-full max-w-3xl p-8 rounded-lg space-y-6 mt-8"
          onSubmit={handleFormSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Enter your todo"
              className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 ${
                inputData ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              disabled={!inputData}
            >
              {editId !== null ? "update" : "Submit"}
            </button>

            <button
              type="button"
              className={`bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-300 ${
                inputData ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* To Do Adds Here. */}
        <div className="w-full flex flex-col items-center space-y-4">
          {data && data.length > 0 ? (
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="w-1/12 text-center py-3 px-4 font-semibold text-sm">
                      Checked
                    </th>
                    <th className="w-7/12 text-left py-3 px-4 font-semibold text-sm">
                      To-Do Item
                    </th>
                    <th className="w-4/12 text-left py-3 px-4 font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((items, index) => (
                    // console.log("ye hai jalwa ::",items)
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          className={`form-checkbox h-5 w-5 text-blue-600 `}
                          onChange={() => handleCheckBoxChnage(items.id)}
                          checked={items.checked}
                        />
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          items.checked ? "line-through" : ""
                        }`}
                      >
                        {items.inputData}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(items.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(items.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500">No items</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ToDoApp;
