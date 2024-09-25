import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({ tasks, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChange = (name, value) => {
    queryParams.page = 1;
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };
  //   console.log(queryParams);

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-nowrap">
            <th className="px-3 py-3">ID</th>
            <th className="px-3 py-3">Image</th>
            <th className="px-3 py-3">Name</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Create Date</th>
            <th className="px-3 py-3">Due Date</th>
            <th className="px-3 py-3">Created By</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-nowrap">
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3">
              <TextInput
                defaultValue={queryParams.name}
                className="w-full"
                placeholder="Task Name"
                onBlur={(e) => searchFieldChange("name", e.target.value)}
                onKeyPress={(e) => onKeyPress("name", e)}
              />
            </th>
            <th className="px-3 py-3">
              <SelectInput
                defaultValue={queryParams.status}
                className="w-full"
                onChange={(e) => searchFieldChange("status", e.target.value)}
              >
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task) => (
            <tr
              key={task.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <img src={task.image_path} alt="" style={{ width: 60 }} />
              </td>
              <td className="px-3 py-2">{task.name}</td>
              <td className="px-3 py-2">
                <span
                  className={
                    "px-2 py-1 rounded text-white " +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              <td className="px-3 py-2">{task.created_at}</td>
              <td className="px-3 py-2">{task.due_date}</td>
              <td className="px-3 py-2">{task.created_by.name}</td>
              <td className="px-3 py-2">
                <Link
                  href={route("task.edit", task.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                >
                  Edit
                </Link>
                <Link
                  href={route("task.destroy", task.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </div>
  );
}
