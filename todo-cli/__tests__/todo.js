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

// /* eslint-disable no-unused-vars */
// const db = require("../models");

// const getJSDate = (days) => {
//   if (!Number.isInteger(days)) {
//     throw new Error("Need to pass an integer as days");
//   }
//   const today = new Date();
//   const oneDay = 60 * 60 * 24 * 1000;
//   return new Date(today.getTime() + days * oneDay);
// };

// describe("Tests for functions in todo.js", function () {
//   beforeAll(async () => {
//     await db.sequelize.sync({ force: true });
//   });

//   test("Todo.overdue should return all tasks (including completed ones) that are past their due date", async () => {
//     const todo = await db.Todo.addTask({
//       title: "This is a sample item",
//       dueDate: getJSDate(-2),
//       completed: false,
//     });
//     const items = await db.Todo.overdue();
//     expect(items.length).toBe(1);
//   });

//   test("Todo.dueToday should return all tasks that are due today (including completed ones)", async () => {
//     const dueTodayItems = await db.Todo.dueToday();
//     const todo = await db.Todo.addTask({
//       title: "This is a sample item",
//       dueDate: getJSDate(0),
//       completed: false,
//     });
//     const items = await db.Todo.dueToday();
//     expect(items.length).toBe(dueTodayItems.length + 1);
//   });

//   test("Todo.dueLater should return all tasks that are due on a future date (including completed ones)", async () => {
//     const dueLaterItems = await db.Todo.dueLater();
//     const todo = await db.Todo.addTask({
//       title: "This is a sample item",
//       dueDate: getJSDate(2),
//       completed: false,
//     });
//     const items = await db.Todo.dueLater();
//     expect(items.length).toBe(dueLaterItems.length + 1);
//   });

//   test("Todo.markAsComplete should change the `completed` property of a todo to `true`", async () => {
//     const overdueItems = await db.Todo.overdue();
//     const aTodo = overdueItems[0];
//     expect(aTodo.completed).toBe(false);
//     await db.Todo.markAsComplete(aTodo.id);
//     await aTodo.reload();

//     expect(aTodo.completed).toBe(true);
//   });

//   test("For a completed past-due item, Todo.displayableString should return a string of the format `ID. [x] TITLE DUE_DATE`", async () => {
//     const overdueItems = await db.Todo.overdue();
//     const aTodo = overdueItems[0];
//     expect(aTodo.completed).toBe(true);
//     const displayValue = aTodo.displayableString();
//     expect(displayValue).toBe(
//       `${aTodo.id}. [x] ${aTodo.title} ${aTodo.dueDate}`,
//     );
//   });

//   test("For an incomplete todo in the future, Todo.displayableString should return a string of the format `ID. [ ] TITLE DUE_DATE`", async () => {
//     const dueLaterItems = await db.Todo.dueLater();
//     const aTodo = dueLaterItems[0];
//     expect(aTodo.completed).toBe(false);
//     const displayValue = aTodo.displayableString();
//     expect(displayValue).toBe(
//       `${aTodo.id}. [ ] ${aTodo.title} ${aTodo.dueDate}`,
//     );
//   });

//   test("For an incomplete todo due today, Todo.displayableString should return a string of the format `ID. [ ] TITLE` (date should not be shown)", async () => {
//     const dueTodayItems = await db.Todo.dueToday();
//     const aTodo = dueTodayItems[0];
//     expect(aTodo.completed).toBe(false);
//     const displayValue = aTodo.displayableString();
//     expect(displayValue).toBe(`${aTodo.id}. [ ] ${aTodo.title}`);
//   });

//   test("For a complete todo due today, Todo.displayableString should return a string of the format `ID. [x] TITLE` (date should not be shown)", async () => {
//     const dueTodayItems = await db.Todo.dueToday();
//     const aTodo = dueTodayItems[0];
//     expect(aTodo.completed).toBe(false);
//     await db.Todo.markAsComplete(aTodo.id);
//     await aTodo.reload();
//     const displayValue = aTodo.displayableString();
//     expect(displayValue).toBe(`${aTodo.id}. [x] ${aTodo.title}`);
//   });
// });
