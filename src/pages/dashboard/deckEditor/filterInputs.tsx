// External Imports
import { ChangeEvent } from "react";

// Functions
import { capitalizeFirstLetter } from "../../../utils/utils";

interface FilterInputsProps {
  filters: Record<string, boolean>; // Filters object with boolean values
  deckStats: Record<string, number>; // Deck stats object with numeric values
  filterCards: (e: ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
}

export default function FilterInputs({ filters, deckStats, filterCards }: FilterInputsProps) {
  return (
    <div className="flex justify-between overflow-x-scroll filter-container">
      {Object.entries(filters).map(([filterName, value]) => {
        if (deckStats[filterName]?.count === 0) return null;
        
        return (
          <label 
            key={filterName}
            htmlFor={filterName}
            className="relative block mx-5 filter-checkbox-container"
          >
            {capitalizeFirstLetter(filterName)}
            <input
              type="checkbox"
              id={ filterName }
              name={ filterName }
              className="absolute filter-checkboxes"
              checked={ value }
              onChange= { filterCards }
            />
            <span className="absolute flex justify-center items-center rounded-full filter-checkmark" />
          </label>
        );
      })}
    </div>
  );
}
