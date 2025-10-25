import React, { useState } from "react";

export default function SkillsInput() {
  const [skillslist, updateskill] = useState([]);
  const [Eductaion, updateEducation] = useState([]);
  const [Experience, updateExperience] = useState(0);
  const [Leadership, updateLeadership] = useState(0);
  const [Impact, updateImpact] = useState(0);
  const [Contact, updateContact] = useState(0);
  const [Budget, updateBudget] = useState(0);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      {/* Skills Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <button
          onClick={() => updateskill([...skillslist, ""])}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        >
          + Add Skill
        </button>

        {skillslist.map((value, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              value={value}
              onChange={(e) => {
                const newList = [...skillslist];
                newList[index] = e.target.value;
                updateskill(newList);
              }}
              placeholder="Enter skill"
              className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() =>
                updateskill(skillslist.filter((_, i) => i !== index))
              }
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        <button
          onClick={() => updateEducation([...Eductaion, ""])}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
        >
          + Add Education
        </button>

        {Eductaion.map((value, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              value={value}
              onChange={(e) => {
                const newList = [...Eductaion];
                newList[index] = e.target.value;
                updateEducation(newList);
              }}
              placeholder="Enter Education"
              className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() =>
                updateEducation(Eductaion.filter((_, i) => i !== index))
              }
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Sliders Section */}
      <div className="space-y-6">
        <div>
          <label htmlFor="Exp" className="block font-medium">
            Years of Experience: {Experience}
          </label>
          <input
            type="range"
            id="Exp"
            min={0}
            max={20}
            value={Experience}
            onChange={(e) => updateExperience(e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <label htmlFor="Leader" className="block font-medium">
            Leadership: {Leadership}
          </label>
          <input type="range" id="Leader" min={0} max={10} value={Leadership} onChange={(e) => updateLeadership(e.target.value)} className="w-full accent-purple-600"
          />
        </div>

        <div>
          <label htmlFor="Impact" className="block font-medium">
            Impact on Organization: {Impact}
          </label>
          <input type="range" id="Impact" min={0} max={10} value={Impact} onChange={(e) => updateImpact(e.target.value)} className="w-full accent-green-600"
          />
        </div>

        <div>
          <label htmlFor="Contact" className="block font-medium">
            Contact Level: {Contact}
          </label>
          <input type="range" id="Contact" min={0} max={10} value={Contact} onChange={(e) => updateContact(e.target.value)} className="w-full accent-yellow-600"
          />
        </div>

        <div>
          <label htmlFor="Budget" className="block font-medium">Budget Handling: {Budget}</label>
          <input type="range" id="Budget" min={0} max={10} value={Budget} onChange={(e) => updateBudget(e.target.value)} className="w-full accent-red-600"
          />
        </div>
      </div>
    </div>
  );
}
