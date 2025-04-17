const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];
const today = formattedDate(new Date());
const yesterday = formattedDate(new Date(Date.now() - 86400000));
const tomorrow = formattedDate(new Date(Date.now() + 86400000));

describe("TodoList Test Suite", () => {
  let todos;
  let all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList;

  beforeEach(() => {
    todos = todoList();
    ({
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList,
    } = todos);

    add({ title: "Overdue Task", completed: false, dueDate: yesterday });
    add({ title: "Today incomplete", completed: false, dueDate: today });
    add({ title: "Today complete", completed: true, dueDate: today });
    add({ title: "Future task", completed: false, dueDate: tomorrow });
  });

  test("Should add new todo", () => {
    const count = all.length;
    add({ title: "New Task", completed: false, dueDate: today });
    expect(all.length).toBe(count + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should return overdue items", () => {
    const result = overdue();
    expect(result.every((todo) => todo.dueDate < today)).toBe(true);
  });

  test("Should return due today items", () => {
    const result = dueToday();
    expect(result.every((todo) => todo.dueDate === today)).toBe(true);
  });

  test("Should return due later items", () => {
    const result = dueLater();
    expect(result.every((todo) => todo.dueDate > today)).toBe(true);
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
