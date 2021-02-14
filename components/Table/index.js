function renderTableRows(student, filters) {
  let ret = filters
    .map(
      (product) => `<tr>
  <td>Filter:</td>
  <td>${product.name}</td>
  </tr>`
    )
    .join("\n");

  ret += student
    .map(
      (product) => `<tr>
  <td>${product.name}</td>
  <td>${product.score}</td>
  <td>${product.id}</td>
</tr>
`
    )
    .join("\n");
  return ret;
}

export default (student, filters = [{ name: "No Filters", data: [] }]) => `
  <table>
    ${renderTableRows(student, filters)}
  </table>
`;
