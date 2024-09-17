import { HashMap } from "../hashmap/hashmap.mjs";

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
  constructor(data) {
    this.data = data;
    this.adjacentIndices = new HashMap();
  }
  addAdjacentIndices(vertex, weight) {
    this.adjacentIndices.set(vertex, weight);
  }
}
let chicago = new weightedGraphVertex("chicago");
let elPaso = new weightedGraphVertex("elPaso");
let denver = new weightedGraphVertex("denver");
let boston = new weightedGraphVertex("boston");
let atlanta = new weightedGraphVertex("atlanta");

let cheapestPriceTable = new HashMap();
let alice = new Vertex("alice");
let bob = new Vertex("bob");
let candy = new Vertex("candy");
let david = new Vertex("david");
alice.addAdjacentIndices(bob);
alice.addAdjacentIndices(candy);
