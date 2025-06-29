import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const locations = {
  'United States': {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville']
  },
  'Canada': {
    'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London'],
    'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau']
  },
  'United Kingdom': {
    'England': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
    'Wales': ['Cardiff', 'Swansea', 'Newport', 'Wrexham']
  }
};

function LocationSelector() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const countries = Object.keys(locations);
  const states = selectedCountry ? Object.keys(locations[selectedCountry as keyof typeof locations]) : [];
  const cities = selectedCountry && selectedState ? 
    locations[selectedCountry as keyof typeof locations][selectedState as keyof typeof locations[keyof typeof locations]] : [];

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity('');
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Select Your Location</h3>
          <p className="text-sm text-gray-600">Find communities near you</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Country Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* State/Province Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              disabled={!selectedCountry}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a state/province</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {selectedCity && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              📍 Location set to: {selectedCity}, {selectedState}, {selectedCountry}
            </p>
            <p className="text-green-600 text-sm mt-1">
              We'll show you communities and events in your area!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;