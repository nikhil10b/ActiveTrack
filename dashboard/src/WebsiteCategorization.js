import React, { useState } from 'react';

function WebsiteCategorization({ websites }) {
  const categories = ['Distracting', 'Productive', 'Entertainment'];
  const [websiteCategories, setWebsiteCategories] = useState({});

  const handleCategorySelect = (website, category) => {
    setWebsiteCategories({ ...websiteCategories, [website]: category });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Website Categorization</h2>
      <ul>
        {websites.map((website, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <span className="text-lg">{website}</span>
            <select onChange={(e) => handleCategorySelect(website, e.target.value)} className="border border-gray-300 rounded-md px-2 py-1">
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WebsiteCategorization;
