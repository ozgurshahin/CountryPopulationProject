function generateTable(countryDTOs) {
    // Generate the HTML table with columns
    const table = `
    <table>
    <head>
        <link rel="stylesheet" href="/stylesheets/style.css">
    </head>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        ${countryDTOs
        .map(
            (country, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${country.name}</td>
                <td>${country.capital}</td>
                <td>${country.population}</td>
                <td>${country.flag}</td>
              </tr>
            `
        )
        .join('')}
      </tbody>
    </table>
  `;

    return table;
}

module.exports = generateTable;
