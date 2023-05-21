const express = require('express');
const axios = require('axios');
const generateTable = require('./routes/tableGenaretor');
const generateSelectBoxOptions = require('./routes/selectBoxGenarator');
const path = require('path');
const CountryDTO = require("./routes/CountryDTO");


const app = express();
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    try {
        let url = 'https://restcountries.com/v3.1/all';
        const response = await axios.get(url);
        const countryData = response.data;

        const filterName = req.query.name || ''; // Get the name filter from query parameter

        const countryDTOs = countryData
            .filter((country) =>
                country.name.common.toLowerCase().includes(filterName.toLowerCase())
            )
            .map((country) => {
                const name = country.name.common || '';
                const capital = country.capital?.[0] || '';
                const population = country.population || 0;
                const flag = country.flag || 0;

                return new CountryDTO(name, capital, population, flag);
            });

        // Generate the HTML select box options by calling the function
        const selectOptions = generateSelectBoxOptions(countryData);

        // Generate the HTML table by calling the function
        const table = generateTable(countryDTOs);

        // Generate the HTML response with the select box and table
        const htmlResponse = `
      <form>
        <label for="name-filter">Filter by Name:</label>
        <select id="name-filter" name="name">
          <option value="">All</option>
          ${selectOptions}
        </select>
        <button type="submit">Apply</button>
      </form>
      <br>
      ${table}
    `;

        res.send(htmlResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
