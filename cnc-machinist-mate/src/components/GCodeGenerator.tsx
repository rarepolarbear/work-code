'use client';

import { useState } from 'react';

const GCodeGenerator = () => {
  const [cutterDiameter, setCutterDiameter] = useState(0.5);
  const [circleDiameter, setCircleDiameter] = useState(3.0);
  const [speed, setSpeed] = useState(3000);
  const [feed, setFeed] = useState(20.0);
  const [depthOfCut, setDepthOfCut] = useState(-0.25);
  const [stepover, setStepover] = useState(0.2);
  const [gCode, setGCode] = useState('');

  const generateGCode = () => {
    const radius = circleDiameter / 2;
    const cutterRadius = cutterDiameter / 2;
    const effectiveRadius = radius - cutterRadius;

    const code = `
G00 G90 G54;
S${speed} M03;
G00 X${effectiveRadius.toFixed(4)} Y0.;
G01 Z${depthOfCut.toFixed(4)} F${feed.toFixed(2)};
G02 I-${effectiveRadius.toFixed(4)} F${feed.toFixed(2)};
G00 Z1.0;
M05;
M30;
`;
    setGCode(code);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Circular Interpolation G-Code Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Cutter Diameter (in)</label>
          <input type="number" value={cutterDiameter} onChange={(e) => setCutterDiameter(parseFloat(e.target.value))} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Circle Diameter (in)</label>
          <input type="number" value={circleDiameter} onChange={(e) => setCircleDiameter(parseFloat(e.target.value))} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Speed (RPM)</label>
          <input type="number" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Feed (in/min)</label>
          <input type="number" value={feed} onChange={(e) => setFeed(parseFloat(e.target.value))} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Depth of Cut (in)</label>
          <input type="number" value={depthOfCut} onChange={(e) => setDepthOfCut(parseFloat(e.target.value))} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stepover (in)</label>
          <input type="number" value={stepover} onChange={(e) => setStepover(parseFloat(e.target.value))} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
      </div>
      <div className="text-center mt-8">
        <button onClick={generateGCode} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
          Generate G-Code
        </button>
      </div>
      {gCode && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Generated G-Code</h3>
          <div className="bg-gray-900 p-4 rounded-lg relative">
            <pre className="text-left whitespace-pre-wrap">{gCode}</pre>
            <button onClick={() => navigator.clipboard.writeText(gCode)} className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-md text-sm">
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GCodeGenerator;
