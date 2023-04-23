export async function fetchCountries(name) {
  const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`);
  const countries = await response.json();

  if (countries.length > 10) {
    return [];
  } else if (countries.length > 2) {
    return countries;
  } else if (countries.length === 1) {
    return [countries[0]];
  } else {
    return [];
  }
}