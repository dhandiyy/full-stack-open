import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [searchValue, setSearchValue] = useState("");
    const [countries, setCountries] = useState([]);
    const [visibleCountries, setVisibleCountries] = useState({});

    useEffect(() => {
        console.log(`Fetching data..`)
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
                console.log(countries)
            })

    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )

    const handleInputSearching = (event) => {
        setSearchValue(event.target.value);
    }

    const toggleCountryVisibility = (countryName) => {
        setVisibleCountries(prev => ({
            ...prev, [countryName]: !prev[countryName]
        }))
    }

    return (
        <div>
            find countries <input onChange={handleInputSearching} value={searchValue} />
            {filteredCountries.length > 10 ? (
                <p>Too many matches, please specify your search further.</p>
            ) : filteredCountries.length === 1 ? (
                <div>
                    <h2>{filteredCountries[0].name.common}</h2>
                    <p><strong>Capital:</strong> {filteredCountries[0].capital}</p>
                    <p><strong>Area:</strong> {filteredCountries[0].area} km²</p>
                    <p><strong>Languages:</strong></p>
                    <ul>
                        {Object.values(filteredCountries[0].languages).map(language => (
                            <li key={language}>{language}</li>
                        ))
                        }
                    </ul>
                    <img
                        src={filteredCountries[0].flags.png}
                        alt={`Flag of ${filteredCountries[0].name.common}`}
                        width="150"
                    />
                </div>
            ) : (
                filteredCountries.map((country) => (
                    <div key={country.name.common}>
                        {country.name.common} <button onClick={() => toggleCountryVisibility(country.name.common)}>
                        {visibleCountries[country.name.common]? "hide" : "show"}
                    </button>
                        {visibleCountries[country.name.common] && (
                            <div>
                                <p><strong>Capital:</strong> {country.capital}</p>
                                <p><strong>Area:</strong> {country.area} km²</p>
                                <p><strong>Languages:</strong></p>
                                <ul>
                                    {Object.values(country.languages).map(language => (
                                        <li key={language}>{language}</li>
                                    ))}
                                </ul>
                                <img
                                    src={country.flags.png}
                                    alt={`Flag of ${country.name.common}`}
                                    width="100"
                                />
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )

}
export default App;