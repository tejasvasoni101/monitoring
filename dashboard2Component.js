// dashboard2Component.js

// Function to fetch data from API
function fetchDataAndUpdateTable() {
    // Display loading message
    $("#updateTime").text("Updating...");
  
    // Fetch data from API
    $.get("http://stockalgoapp-env.eba-4sqye4mb.ap-south-1.elasticbeanstalk.com/findStock?all=1", function(data) {
      const timestamp = new Date().toLocaleString();
  
      // Store data in local storage with timestamp
      localStorage.setItem("stockData", JSON.stringify({ timestamp, data }));
  
      // Update table with fetched data
      updateTable(data, timestamp);
    }).fail(function() {
      $("#updateTime").text("Failed to fetch data. Please try again.");
    });
  }
  
  // Function to update table with fetched data
  function updateTable(data, timestamp) {
    const table = $("<table>");
    const thead = $("<thead>").appendTo(table);
    const tbody = $("<tbody>").appendTo(table);
  
    // Create table header
    const headerRow = $("<tr>").appendTo(thead);
    $("<th>").text("Stock Name").appendTo(headerRow);
    $("<th>").text("Price").appendTo(headerRow);
    $("<th>").text("Volume").appendTo(headerRow);
  
    // Populate table rows with data
    data.forEach(item => {
      const row = $("<tr>").appendTo(tbody);
      $("<td>").text(item.stockName).appendTo(row);
      $("<td>").text(item.price).appendTo(row);
      $("<td>").text(item.volume).appendTo(row);
    });
  
    // Update table
    $("#stockTable").empty().append(table);
    $("#updateTime").text("Last Updated: " + timestamp);
  }
  
  $(document).ready(function() {
    // Check if data is present in local storage
    const storedData = localStorage.getItem("stockData");
    if (storedData) {
      const { timestamp, data } = JSON.parse(storedData);
      updateTable(data, timestamp);
    } else {
      fetchDataAndUpdateTable();
    }
  
    // Add event listener for update button
    $("#updateButton").click(fetchDataAndUpdateTable);
  });
  