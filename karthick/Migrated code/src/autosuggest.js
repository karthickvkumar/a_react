import React from "react";
import Autosuggest from 'react-autosuggest';

const suburbs = ['Cheltenham', 'Mill Park', 'Mordialloc', 'Nunawading'];

function getSuggestions(input, callback) {
  const regex = new RegExp('^' + input, 'i');
  const suggestions = suburbs.filter(suburb => regex.test(suburb));

  setTimeout(() => callback(null, suggestions), 300); // Emulate API call
}