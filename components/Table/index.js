function renderTableRows(student) {
  return student
    .map(
      (product) => `<tr>
  <td>${product.name}</td>
  <td>${product.score}</td>
  <td>${product.id}</td>
</tr>
`
    )
    .join("\n");
}

export default (student) => `
  <table>
    ${renderTableRows(student)}
  </table>
`;
