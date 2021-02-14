import studentInputs from "./components/InputStudent";
import buildTable from "./components/Table";
import students from "./store/students";

const root = document.querySelector("#root");
const data = {
  students,
  // going to be filled with {name: "", data: []}
  studentsFiltered: [],
  getStudents() {
    if (this.studentsFiltered.length === 0) {
      return this.students;
    }

    let ret = [...students];
    this.studentsFiltered.forEach((list) => {
      ret = ret.filter((student) => list.data.includes(student));
    });
    if (!ret) {
      return [
        { name: "no students Match Current Filters", score: "N/A", id: "N/A" },
      ];
    }
    return ret;
  },
  addStudent(newStudent) {
    this.students.push(newStudent);
  },
};

const filterScore = (number, people) =>
  people.filter((person) => number < person.score);

const render = () => {
  root.innerHTML = studentInputs();
  root.innerHTML += buildTable(data.getStudents(), data.studentsFiltered);

  const nameInput = document.querySelector("#name");
  const idInput = document.querySelector("#id");
  const scoreInput = document.querySelector("#score");
  const submit = document.querySelector("#submit");
  const filterScoreInput = document.querySelector("#filterScore");
  const submitFilter = document.querySelector("#submitFilter");

  submit.addEventListener("click", () => {
    data.addStudent({
      name: nameInput.value,
      scoreInput: scoreInput.value,
      id: idInput.value,
    });
    render();
  });

  submitFilter.addEventListener("click", () => {
    data.studentsFiltered.forEach((obj) => {
      if (obj.name === "scoreFilter") {
        obj.data = [...data.students];
      }
    });
    data.studentsFiltered.push({
      name: "scoreFilter",
      data: filterScore(filterScoreInput.value, data.students),
    });
    render();
  });
};

render();
