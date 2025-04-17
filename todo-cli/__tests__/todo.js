const todoList = require("../todo");
const todos = todoList();
const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todos;

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({ title: "Overdue Task", completed: false, dueDate: yesterday });
    add({ title: "Today incomplete", completed: false, dueDate: today });
    add({ title: "Today complete", completed: true, dueDate: today });
    add({ title: "Future task", completed: false, dueDate: tomorrow });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "New Task",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should  return overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.every((todo) => todo.dueDate < today)).toBe(true);
  });

  test("Should  return due today items", () => {
    const todayItems = dueToday();
    expect(todayItems.every((todo) => todo.dueDate === today)).toBe(true);
  });

  test("Should  return due later items", () => {
    const laterItems = dueLater();
    expect(laterItems.every((todo) => todo.dueDate > today)).toBe(true);
  });

  test("Should display todos in displayable format", () => {
    const display = toDisplayableList(all);
    const lines = display.split("\n");

    lines.forEach((line) => {
      expect(line.startsWith("[ ]") || line.startsWith("[x]")).toBe(true);
    });

    const todayItem = dueToday()[0];
    const output = toDisplayableList([todayItem]);
    expect(output.includes(today)).toBe(false);
  });
});
