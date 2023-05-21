function generateSelectBoxOptions(countryData) {
    const countryNames = countryData.map((country) => country.name.common);
    const uniqueCountryNames = [...new Set(countryNames)]; // Remove duplicates

    const sortedCountryNames = uniqueCountryNames.sort((a, b) => a.localeCompare(b)); // Sort names alphabetically

    const selectOptions = sortedCountryNames
        .map((name) => `<option value="${name}">${name}</option>`)
        .join('');

    const allOption = '<option value="">All</option>';

    return allOption + selectOptions;
}

module.exports = generateSelectBoxOptions;
