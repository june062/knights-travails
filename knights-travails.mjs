class Vertex {
  constructor(data) {
    this.data = data;
    this.previous = null;
    this.steps = null;
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
    new Vertex([0, 0]),
    new Vertex([0, 1]),
    new Vertex([0, 2]),
    new Vertex([0, 3]),
    new Vertex([0, 4]),
    new Vertex([0, 5]),
    new Vertex([0, 6]),
    new Vertex([0, 7]),
  ],
  [
    new Vertex([1, 0]),
    new Vertex([1, 1]),
    new Vertex([1, 2]),
    new Vertex([1, 3]),
    new Vertex([1, 4]),
    new Vertex([1, 5]),
    new Vertex([1, 6]),
    new Vertex([1, 7]),
  ],
  [
    new Vertex([2, 0]),
    new Vertex([2, 1]),
    new Vertex([2, 2]),
    new Vertex([2, 3]),
    new Vertex([2, 4]),
    new Vertex([2, 5]),
    new Vertex([2, 6]),
    new Vertex([2, 7]),
  ],
  [
    new Vertex([3, 0]),
    new Vertex([3, 1]),
    new Vertex([3, 2]),
    new Vertex([3, 3]),
    new Vertex([3, 4]),
    new Vertex([3, 5]),
    new Vertex([3, 6]),
    new Vertex([3, 7]),
  ],
  [
    new Vertex([4, 0]),
    new Vertex([4, 1]),
    new Vertex([4, 2]),
    new Vertex([4, 3]),
    new Vertex([4, 4]),
    new Vertex([4, 5]),
    new Vertex([4, 6]),
    new Vertex([4, 7]),
  ],
  [
    new Vertex([5, 0]),
    new Vertex([5, 1]),
    new Vertex([5, 2]),
    new Vertex([5, 3]),
    new Vertex([5, 4]),
    new Vertex([5, 5]),
    new Vertex([5, 6]),
    new Vertex([5, 7]),
  ],
  [
    new Vertex([6, 0]),
    new Vertex([6, 1]),
    new Vertex([6, 2]),
    new Vertex([6, 3]),
    new Vertex([6, 4]),
    new Vertex([6, 5]),
    new Vertex([6, 6]),
    new Vertex([6, 7]),
  ],
  [
    new Vertex([7, 0]),
    new Vertex([7, 1]),
    new Vertex([7, 2]),
    new Vertex([7, 3]),
    new Vertex([7, 4]),
    new Vertex([7, 5]),
    new Vertex([7, 6]),
    new Vertex([7, 7]),
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
  chessboard[start[0]][start[1]].steps = 0;

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
    let col = current.data[0];
    let row = current.data[1];

    for (let i = 0; i < 8; i++) {
      if (i == 0) {
        if (
          current.data[0] + 2 > 7 ||
          current.data[0] + 2 < 0 ||
          current.data[1] + 1 > 7 ||
          current.data[1] + 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 2][row + 1].data) ===
          JSON.stringify(end)
        ) {
          return "You reached the end";
        } else if (visited.includes(chessboard[col + 2][row + 1])) {
          continue;
        } else {
          chessboard[start[0]][start[1]].previous = current;
          chessboard[start[0]][start[1]].steps = current.steps + 1;

          queue.push(chessboard[col + 2][row + 1]);

          continue;
        }
      }
      if (i == 1) {
        if (
          current.data[0] + 2 > 7 ||
          current.data[0] + 2 < 0 ||
          current.data[1] - 1 > 7 ||
          current.data[1] - 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 2][row - 1].data) ===
          JSON.stringify(end)
        ) {
          /* Instead of returning a string, make end reference the previous step and add a 1 to total step count and then return a string
          that says ends step count*/
          return "You found the end";
        } else if (visited.includes(chessboard[col + 2][row - 1])) {
          continue;
        } else {
          chessboard[col + 2][row - 1].previous = current;
          chessboard[col + 2][row - 1].steps = current.steps + 1;

          queue.push(chessboard[col + 2][row - 1]);
          continue;
        }
      }
      if (i == 2) {
        if (
          current.data[0] + 1 > 7 ||
          current.data[0] + 1 < 0 ||
          current.data[1] + 2 > 7 ||
          current.data[1] + 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 1][row + 2].data) ===
          JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col + 1][row + 2])) {
          continue;
        } else {
          chessboard[col + 1][row + 2].previous = current;
          chessboard[col + 1][row + 2].steps = current.steps + 1;
          queue.push(chessboard[col + 1][row + 2]);
          continue;
        }
      }
      if (i == 3) {
        if (
          current.data[0] + 1 > 7 ||
          current.data[0] + 1 < 0 ||
          current.data[1] - 2 > 7 ||
          current.data[1] - 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col + 1][row - 2].data) ===
          JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col + 1][row - 2])) {
          continue;
        } else {
          chessboard[col + 1][row - 2].previous = current;
          chessboard[col + 1][row - 2].steps = current.steps + 1;
          queue.push(chessboard[col + 1][row - 2]);
          continue;
        }
      }
      if (i == 4) {
        if (
          current.data[0] - 2 > 7 ||
          current.data[0] - 2 < 0 ||
          current.data[1] + 1 > 7 ||
          current.data[1] + 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 2][row + 1].data) ===
          JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 2][row + 1])) {
          continue;
        } else {
          chessboard[col - 2][row + 1].previous = current;
          chessboard[col - 2][row + 1].steps = current.steps + 1;
          queue.push(chessboard[col - 2][row + 1]);
          continue;
        }
      }
      if (i == 5) {
        if (
          current.data[0] - 2 > 7 ||
          current.data[0] - 2 < 0 ||
          current.data[1] - 1 > 7 ||
          current.data[1] - 1 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 2][row - 1].data) ===
          JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 2][row - 1])) {
          continue;
        } else {
          chessboard[col - 2][row - 1].previous = current;
          chessboard[col - 2][row - 1].steps = current.steps + 1;
          queue.push(chessboard[col - 2][row - 1]);
          continue;
        }
      }
      if (i == 6) {
        if (
          current.data[0] - 1 > 7 ||
          current.data[0] - 1 < 0 ||
          current.data[1] + 2 > 7 ||
          current.data[1] + 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 1][row + 2].data) ===
          JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 1][row + 2])) {
          continue;
        } else {
          chessboard[col - 1][row + 2].previous = current;
          chessboard[col - 1][row + 2].steps = current.steps + 1;
          queue.push(chessboard[col - 1][row + 2]);
          continue;
        }
      }
      if (i == 7) {
        if (
          current.data[0] - 1 > 7 ||
          current.data[0] - 1 < 0 ||
          current.data[1] - 2 > 7 ||
          current.data[1] - 2 < 0
        ) {
          continue;
        } else if (
          JSON.stringify(chessboard[col - 1][row - 2].data) ===
          JSON.stringify(end)
        ) {
          return "You found the end";
        } else if (visited.includes(chessboard[col - 1][row - 2])) {
          continue;
        } else {
          chessboard[col - 1][row - 2].previous = current;
          chessboard[col - 1][row - 2].steps = current.steps;
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
