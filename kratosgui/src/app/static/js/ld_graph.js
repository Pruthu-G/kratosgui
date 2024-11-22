
/*const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());*/

/* const svg = d3.select("#container");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, chartWidth]);
  const y = d3.scaleLinear().range([chartHeight, 0]);

  const line = d3.line()
    .x(d => x(d.timestamp))
    .y(d => y(d.value));

  const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  let data = [];

  // WebSocket for real-time data
  const socket = new WebSocket('ws://localhost:8765');
  
  socket.onmessage = (event) => {
    const newData = JSON.parse(JSON.parse(event.data));  // Assuming data is in JSON format

    // Extracting the linear.x value from the received message
    const linearX = newData.linear.x;
    const timestamp = Date.now();  // Get current time as the timestamp
    
    // Append the new data point
    data.push({ timestamp, value: linearX });

    // Limit the number of data points to 50
    if (data.length > 50) {
      data.shift();
    }

    // Update scales
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain([0, d3.max(data, d => d.value)]);

    // Clear and redraw the line chart
    chartGroup.selectAll("*").remove(); // Clear previous chart

    chartGroup.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

    // Add axes
    chartGroup.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    chartGroup.append("g")
      .call(d3.axisLeft(y));
  };
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };*/

  // WebSocket for real-time data
  /*const socket = new WebSocket('ws://localhost:8765');
  
  socket.onmessage = (event) => {*/

/*const svg = d3.select("#container");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, chartWidth]);
  const y = d3.scaleLinear().range([chartHeight, 0]);

  const line = d3.line()
    .x(d => x(d.timestamp))
    .y(d => y(d.value));

  const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  let data = [];

  // WebSocket for real-time data
  const socket = new WebSocket('ws://localhost:8765');
  
  socket.onmessage = (event) => {
    const newData = JSON.parse(JSON.parse(event.data));  // Assuming data is in JSON format

    // Extracting the linear.x value from the received message
    const linearX = newData.linear.x;
    const timestamp = Date.now();  // Get current time as the timestamp
    
    // Append the new data point
    data.push({ timestamp, value: linearX });

    // Limit the number of data points to 50
    if (data.length > 50) {
      data.shift();
    }

    // Update scales
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain([0, d3.max(data, d => d.value)]);

    // Clear and redraw the line chart
    chartGroup.selectAll("*").remove(); // Clear previous chart

    chartGroup.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

    // Add axes
    chartGroup.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    chartGroup.append("g")
      .call(d3.axisLeft(y));
  };
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
    const newData = JSON.parse(JSON.parse(event.data));  // Assuming data is in JSON format

    // Extracting the linear.x value from the received message
    const linearX = newData.linear.x;
    const timestamp = Date.now();  // Get current time as the timestamp
    
    // Append the new data point
    data.push({ timestamp, value: linearX });

    // Limit the number of data points to 50
    if (data.length > 50) {
      data.shift();
    }

    // Update scales
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain([0, d3.max(data, d => d.value)]);

    // Clear and redraw the line chart
    chartGroup.selectAll("*").remove(); // Clear previous chart

    chartGroup.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

    // Add axes
    chartGroup.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    chartGroup.append("g")
      .call(d3.axisLeft(y));
  };
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };*/

/*const socket = new WebSocket('ws://localhost:8765');
        
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
        
        // Axes and line generator
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);
        
        const line = d3.line()
            .x(d => x(d.timestamp))
            .y(d => y(d.value));
        
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
        
        // Line path
        const path = g.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);
        
        // WebSocket message handler
        socket.onmessage = function(event) {
            const newData = JSON.parse(JSON.parse(event.data));
            
            // Add new data point
            data.push({
                timestamp: new Date(),
                value: newData.linear.x  // Adjust based on your data structure
            });
            
            // Keep only last 50 data points
            if (data.length > 50) {
                data.shift();
            }
            
            // Update scales
            x.domain(d3.extent(data, d => d.timestamp));
            y.domain([0, d3.max(data, d => d.value)]);
            
            // Update axes
            g.select('.x.axis').call(xAxis);
            g.select('.y.axis').call(yAxis);
            
            // Update line
            path.datum(data)
                .attr('d', line);
        };*/


const socket = new WebSocket('ws://localhost:8765');

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

const line = d3.line()
    .x(d => x(d.timestamp))
    .y(d => y(d.value));

// Define line generators for each of the 6 data series
const lineGenerators = {
    linearX: d3.line().x(d => x(d.timestamp)).y(d => y(d.linearX)),
    linearY: d3.line().x(d => x(d.timestamp)).y(d => y(d.linearY)),
    linearZ: d3.line().x(d => x(d.timestamp)).y(d => y(d.linearZ)),
    angularX: d3.line().x(d => x(d.timestamp)).y(d => y(d.angularX)),
    angularY: d3.line().x(d => x(d.timestamp)).y(d => y(d.angularY)),
    angularZ: d3.line().x(d => x(d.timestamp)).y(d => y(d.angularZ))
};

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

// Create the 6 line paths for each data series
const paths = {
    linearX: g.append('path')
        .datum(data)
        .attr('class', 'line linearX')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', lineGenerators.linearX),
    
    linearY: g.append('path')
        .datum(data)
        .attr('class', 'line linearY')
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('d', lineGenerators.linearY),
    
    linearZ: g.append('path')
        .datum(data)
        .attr('class', 'line linearZ')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('d', lineGenerators.linearZ),
    
    angularX: g.append('path')
        .datum(data)
        .attr('class', 'line angularX')
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 2)
        .attr('d', lineGenerators.angularX),
    
    angularY: g.append('path')
        .datum(data)
        .attr('class', 'line angularY')
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('d', lineGenerators.angularY),
    
    angularZ: g.append('path')
        .datum(data)
        .attr('class', 'line angularZ')
        .attr('fill', 'none')
        .attr('stroke', 'brown')
        .attr('stroke-width', 2)
        .attr('d', lineGenerators.angularZ)
};

// WebSocket message handler
socket.onmessage = function(event) {
    const newData = JSON.parse(JSON.parse(event.data));

    // Add new data point
    data.push({
        timestamp: new Date(),
        linearX: newData.linear.x,
        linearY: newData.linear.y,
        linearZ: newData.linear.z,
        angularX: newData.angular.x,
        angularY: newData.angular.y,
        angularZ: newData.angular.z
    });

    // Keep only last 50 data points
    if (data.length > 50) {
        data.shift();
    }

    // Update scales
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain([0, d3.max(data, d => Math.max(d.linearX, d.linearY, d.linearZ, d.angularX, d.angularY, d.angularZ))]);

    // Update axes
    g.select('.x.axis').call(xAxis);
    g.select('.y.axis').call(yAxis);

    // Update the line paths
    paths.linearX.datum(data).attr('d', lineGenerators.linearX);
    paths.linearY.datum(data).attr('d', lineGenerators.linearY);
    paths.linearZ.datum(data).attr('d', lineGenerators.linearZ);
    paths.angularX.datum(data).attr('d', lineGenerators.angularX);
    paths.angularY.datum(data).attr('d', lineGenerators.angularY);
    paths.angularZ.datum(data).attr('d', lineGenerators.angularZ);
};
