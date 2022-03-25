import React from "react";

const CountryList = ( {country, setSearchCountry} ) => {
    return (
        <div>
            <p key={country.name.common}> {country.name.common}
            <button onClick={setSearchCountry}>show</button></p>
        </div>
    
    )
}

export default CountryList