import studentInputs from "./components/InputStudent";
import buildTable from "./components/Table";
import studentsData from "./store/students";

const root = document.querySelector("#root");
const data = {
  students: [...studentsData],
  // going to be filled with {name: "", data: []}
  studentsFiltered: [],
  getStudents() {
    if (this.studentsFiltered.length === 0) {
      return this.students;
    }
    let ret = [...this.students];
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
    this.studentsFiltered = [];
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
  const testInput = document.querySelector("#test");

  submit.addEventListener("click", () => {
    data.addStudent({
      name: nameInput.value,
      id: idInput.value,
      score: scoreInput.value,
      test: testInput.value,
    });
    console.log(data.students);
    render();
  });

  submitFilter.addEventListener("click", () => {
    let adjusted = false;
    data.studentsFiltered.forEach((obj) => {
      if (obj.name === "scoreFilter") {
        obj.data = filterScore(filterScoreInput.value, data.students);
        adjusted = true;
      }
    });
    if (!adjusted) {
      data.studentsFiltered.push({
        name: "scoreFilter",
        data: filterScore(filterScoreInput.value, data.students),
      });
    }
    render();
  });
};

render();
