import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from "react";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const AddressAutocomplete = ({ value, onChange, onSelect }) => {
  const [error, setError] = useState("");

  const handleError = (status) => {
    if (status === "ZERO_RESULTS") {
      setError("No results found");
    } else {
      setError("Error occurred");
    }
  };

  return (
    <div>
      <PlacesAutocomplete
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        onError={handleError}
        searchOptions={{ types: ["address"] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter address...",
                className: "location-search-input",
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#fafafa" : "#ffffff",
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
            {error && <div className='error'>{error}</div>}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default AddressAutocomplete;
