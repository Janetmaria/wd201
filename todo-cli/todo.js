const todoList = () => {
  let all = [];

  const formattedDate = (d) => d.toISOString().split("T")[0];
  const today = formattedDate(new Date());

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < all.length) {
      all[index].completed = true;
    }
  };

  const overdue = () => {
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const displayDate = todo.dueDate === today ? "" : ` ${todo.dueDate}`;
        return `${checkbox} ${todo.title} ${displayDate}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
