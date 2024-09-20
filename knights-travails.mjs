class Vertex {
  constructor(data) {
    this.data = data;
    this.adjacentIndices = [];
  }
  addAdjacentIndices(vertex) {
    if (this.adjacentIndices.includes(vertex)) {
      return;
    }
    this.adjacentIndices.push(vertex);
    vertex.addAdjacentIndices(this);
  }
  depthFirstSearch(vertex, startVertex, visitedVertices = []) {
    if (vertex.data === startVertex.data) {
      return vertex;
    }
    visitedVertices.push(startVertex);

    for (let element of startVertex.adjacentIndices) {
      if (element.data === vertex.data) {
        return element;
      } else if (visitedVertices.includes(element) === true) {
        continue;
      } else {
        this.depthFirstSearch(vertex, element, visitedVertices);
      }
    }
    return null;
  }
  breadthFirstSearch(startingVertex, vertexToFind) {
    let queue = [];
    let visitedVertices = [];
    if (startingVertex.data === vertexToFind.data) {
      return startingVertex;
    } else {
      visitedVertices.push(startingVertex);
      queue.push(startingVertex);
    }
    while (queue.length !== 0) {
      let currentVertex = queue[0];
      queue.splice(0, 1);
      innerLoop: for (let element of currentVertex.adjacentIndices) {
        if (visitedVertices.includes(element)) {
          continue innerLoop;
        } else if (element.data === vertexToFind.data) {
          return element;
        } else {
          visitedVertices.push(element);
          queue.push(element);
        }
      }
    }
    return null;
  }
}

class weightedGraphVertex {
  constructor(name) {
    this.name = name;
    this.routes = new Map();
  }
  addRoute(city, price) {
    this.routes.set(city, price);
  }
}
let chicago = new weightedGraphVertex("chicago");
let elPaso = new weightedGraphVertex("elPaso");
let denver = new weightedGraphVertex("denver");
let boston = new weightedGraphVertex("boston");
let atlanta = new weightedGraphVertex("atlanta");

atlanta.addRoute(boston, 100);
atlanta.addRoute(denver, 160);
boston.addRoute(chicago, 120);
boston.addRoute(denver, 180);
chicago.addRoute(elPaso, 80);
denver.addRoute(chicago, 40);
denver.addRoute(elPaso, 140);
elPaso.addRoute(boston, 100);

function shortestPath(startingCity, finalDestination) {
  let cheapestPriceTable = new Map();
  let cheapestPreviosStopOverCityTable = new Map();
  let visitedCities = new Map();
  let unvisitedCities = [];

  cheapestPriceTable.set(startingCity, 0);
  let currentCity = startingCity;

  while (currentCity) {
    visitedCities.set(currentCity, "visited");
    unvisitedCities.splice(unvisitedCities.indexOf(currentCity), 1);
    for (let [key, value] of currentCity.routes) {
      if (!visitedCities.has(key) && !unvisitedCities.includes(key)) {
        unvisitedCities.push(key);
      }
      let passingThroughCurrentCity =
        cheapestPriceTable.get(currentCity) + value;
      if (
        !cheapestPriceTable.has(key) ||
        passingThroughCurrentCity < cheapestPriceTable.get(key)
      ) {
        cheapestPriceTable.set(key, passingThroughCurrentCity);
        cheapestPreviosStopOverCityTable.set(key, currentCity);
      }
    }
    if (unvisitedCities.length > 0) {
      currentCity = unvisitedCities.reduce((city, minCity) => {
        return (
          cheapestPriceTable.get(city) < cheapestPriceTable.get(minCity)
            ? city
            : minCity,
          unvisitedCities[0]
        );
      });
    } else {
      currentCity = null;
    }
  }
  let shortestPath = [];
  currentCity = finalDestination;
  while (currentCity !== startingCity) {
    shortestPath.push(currentCity.name);
    currentCity = cheapestPreviosStopOverCityTable.get(currentCity);
  }
  shortestPath.push(startingCity.name);
  return shortestPath.reverse();
}

let chessboard = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
  ],
  [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ],
  [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
  ],
  [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
  ],
  [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
  ],
  [
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
  ],
];

function knightsTravails(start, end) {
  if (
    start[0] > 7 ||
    start[0] < 0 ||
    start[1] > 7 ||
    start[1] < 0 ||
    end[0] > 7 ||
    end[0] < 0 ||
    end[1] > 7 ||
    end[1] < 0
  ) {
    throw new Error("Must enter a valid chess square");
  }
  let current;
  let queue = [];
  let visited = [];

  /* Loop that goes through all vertices to determine which follow the rules of knights movement
  starting from start and add all valid vertices to starts adjacentVertices array */
  if (start === end) {
    return "We got there in 0 steps!";
  } else {
    queue.push(chessboard[start[0]][start[1]]);
  }
  while (queue.length > 0) {
    current = queue[0];
    queue.splice(0, 1);
    visited.push(current);
    if (current === end) {
      return "You reached the end";
    }
    let col = current[0];
    let row = current[1];
    let adjacent;

    for (let i = 0; i < 8; i++) {
      if (i == 0) {
        if (
          current[0] + 2 > 7 ||
          current[0] + 2 < 0 ||
          current[1] + 1 > 7 ||
          current[1] + 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 2][row + 1]) === JSON.stringify(end)
        ) {
          return "You reached the end";
        } else if (visited.includes(chessboard[col + 2][row + 1])) {
          continue;
        } else {
          queue.push(chessboard[col + 2][row + 1]);

          continue;
        }
      }
      if (i == 1) {
        if (
          current[0] + 2 > 7 ||
          current[0] + 2 < 0 ||
          current[1] - 1 > 7 ||
          current[1] - 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 2][row - 1]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col + 2][row - 1])) {
          continue;
        } else {
          queue.push(chessboard[col + 2][row - 1]);
          continue;
        }
      }
      if (i == 2) {
        if (
          current[0] + 1 > 7 ||
          current[0] + 1 < 0 ||
          current[1] + 2 > 7 ||
          current[1] + 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 1][row + 2]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col + 1][row + 2])) {
          continue;
        } else {
          queue.push(chessboard[col + 1][row + 2]);
          continue;
        }
      }
      if (i == 3) {
        if (
          current[0] + 1 > 7 ||
          current[0] + 1 < 0 ||
          current[1] - 2 > 7 ||
          current[1] - 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 1][row - 2]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col + 1][row - 2])) {
          continue;
        } else {
          queue.push(chessboard[col + 1][row - 2]);
          continue;
        }
      }
      if (i == 4) {
        if (
          current[0] - 2 > 7 ||
          current[0] - 2 < 0 ||
          current[1] + 1 > 7 ||
          current[1] + 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 2][row + 1]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 2][row + 1])) {
          continue;
        } else {
          queue.push(chessboard[col - 2][row + 1]);
          continue;
        }
      }
      if (i == 5) {
        if (
          current[0] - 2 > 7 ||
          current[0] - 2 < 0 ||
          current[1] - 1 > 7 ||
          current[1] - 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 2][row - 1]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 2][row - 1])) {
          continue;
        } else {
          queue.push(chessboard[col - 2][row - 1]);
          continue;
        }
      }
      if (i == 6) {
        if (
          current[0] - 1 > 7 ||
          current[0] - 1 < 0 ||
          current[1] + 2 > 7 ||
          current[1] + 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 1][row + 2]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 1][row + 2])) {
          continue;
        } else {
          queue.push(chessboard[col - 1][row + 2]);
          continue;
        }
      }
      if (i == 7) {
        if (
          current[0] - 1 > 7 ||
          current[0] - 1 < 0 ||
          current[1] - 2 > 7 ||
          current[1] - 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 1][row - 2]) === JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 1][row - 2])) {
          continue;
        } else {
          queue.push(chessboard[col - 1][row - 2]);
          continue;
        }
      }
    }
  }
}
console.log(knightsTravails([0, 0], [1, 2]));
/* Make currents adjacent vertices the vertices that follow the rules of knights movement.
    Check if  */
/* Loop through each of currents adjacent vertices:
    if(adjacent vertex === end){
      return the path we took to get there
    }else{
      queue.push(adjacent vertex)
    } */
