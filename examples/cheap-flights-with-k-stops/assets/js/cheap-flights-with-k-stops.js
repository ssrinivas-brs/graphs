

/** 
Constraints for the Algorithm
    - 1 <= n <= 100
    - 0 <= flights.length <= (n * (n - 1) / 2)
    - flights[i].length == 3
    - 0 <= fromi, toi < n
    - fromi != toi
    - 1 <= pricei <= 104
    - There will not be any multiple flights between two cities.
    - 0 <= source, destination, k < n
    - source != destination
**/

// Algorithm
let findCheapestPrice = function (n, flights, source, destination, K) {
  const adjacencyList = new Map();

  for (let [start, end, cost] of flights) {
    if (adjacencyList.has(start)) adjacencyList.get(start).push([end, cost]);
    else adjacencyList.set(start, [[end, cost]]);
  }

  const queue = [[0, source, K + 1]];
  const visited = new Map();

  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);

    const [cost, city, stops] = queue.shift();
    visited.set(city, stops);

    if (city === destination) return cost;
    if (stops <= 0 || !adjacencyList.has(city)) continue;

    for (let [nextCity, nextCost] of adjacencyList.get(city)) {
      if (visited.has(nextCity) && visited.get(nextCity) >= stops - 1) continue;
      queue.push([cost + nextCost, nextCity, stops - 1]);
    }
  }
  return -1;
};

// Implementation
const results = findCheapestPrice(
  4,
  [
    [0, 1, 100],
    [1, 2, 100],
    [2, 0, 100],
    [1, 3, 600],
    [2, 3, 200],
  ],
  0,
  3,
  1
);
console.log("The cheap flight with k stops is: ");
console.log(results);

// BIG O Notation
// Time complexity -  O(N + E * K * log(E * K)) - where E is number of flights & N is number of cities & K is number of stops allowed
// Space complexity - O(N + E * K)
