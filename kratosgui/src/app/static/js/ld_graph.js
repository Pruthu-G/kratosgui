const colourScheme=[
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "red",
  "red",
  "green",
  "red",
  "green",
  "red",
  "green",
  "green",
  "green",
  "green",
  "red",
  "red"
];

const socket = new WebSocket('ws://localhost:8766');

// SVG setup
const svg = d3.select('svg');
const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

// Scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Data storage
const data = [];

// Axes and line generators
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

// Define dynamic line generators for all 18 elements
const lineGenerators = Array.from({ length: 18 }, (_, index) =>
    d3.line()
        .x(d => x(d.timestamp))
        .y(d => y(d[`value${index}`]))
);

// Append group for chart
const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Axes
g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);

g.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

// Create paths for all 18 data series
const paths = Array.from({ length: 18 }, (_, index) =>
    g.append('path')
        .datum(data)
        .attr('class', `line value${index}`)
        .attr('fill', 'none')
        .attr('stroke', colourScheme[index % 18]) // Cycles through 10 colors
        .attr('stroke-width', 2)
        .attr('d', lineGenerators[index])
);

// WebSocket message handler
socket.onmessage = function(event) {
    const newData = JSON.parse(JSON.parse(event.data));

    // Extract timestamp and all 18 elements from the Float64MultiArray's data field
    const newPoint = { timestamp: new Date() };
    newData.data.forEach((value, index) => {
        newPoint[`value${index}`] = value;
    });

    // Add the new point to the data array
    data.push(newPoint);

    // Keep only the last 50 data points
    if (data.length > 50) {
        data.shift();
    }

    // Update scales
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain([
        0,
        d3.max(data, d =>
            Math.max(...Array.from({ length: 18 }, (_, index) => d[`value${index}`]))
        )
    ]);

    // Update axes
    g.select('.x.axis').call(xAxis);
    g.select('.y.axis').call(yAxis);

    // Update the line paths for all 18 data series
    paths.forEach((path, index) => {
        path.datum(data).attr('d', lineGenerators[index]);
    });
};
