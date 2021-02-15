function renderTableRows(student, filters) {
  const tests = { noName: { name: "no name", scores: [] } };
  let ret = filters
    .map(
      (product) => `<tr>
  <td>Filter:</td>
  <td>${product.name}</td>
  </tr>`
    )
    .join("\n");

  student.map((obj) => {
    if (!obj.test) {
      tests.noName.scores.push(obj);
    } else if (!tests[obj.test]) {
      tests[obj.test] = { name: `${obj.test}`, scores: [obj] };
    } else {
      tests[obj.test].scores.push(obj);
    }
  });

  console.log(tests);
  Object.keys(tests).map((key) => {
    let innerRet = `<h2>Test: ${tests[key].name}</h2><table>`;
    console.log(Object.keys(tests).length);
    innerRet += tests[key].scores
      .map(
        (product) => `<tr>
  <td>${product.name}</td>
  <td>${product.score}</td>
  <td>${product.id}</td>
</tr>
`
      )
      .join("\n");
    ret += innerRet;
    ret += `</table>`;
  });

  return ret;
}

export default (student, filters = [{ name: "No Filters", data: [] }]) => `

    ${renderTableRows(student, filters)}`;

//   ret += student
//     .map(
//       (product) => `<tr>
//   <td>${product.name}</td>
//   <td>${product.score}</td>
//   <td>${product.id}</td>
// </tr>
// `
//     )
//     .join("\n");
//   return ret;
