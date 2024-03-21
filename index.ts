import { params_weighted_leven } from "./params_weighted_leven"

function levenshtein(
  str1: string,
  str2: string,
  insert_costs: Array<any>,
  delete_costs: Array<any>,
  substitute_costs: Array<Array<any>>
) {
  // to store the distances
  let distances = new Array(str1.length + 1);
  for (let i = 0; i <= str1.length; i++) {
    distances[i] = new Array(str2.length + 1);
  }

  // first row and column
  for (let i = 0; i <= str1.length; i++) {
    distances[i][0] = i + delete_costs[str1[i]?.charCodeAt(0) || 0];
  }

  for (let j = 0; j <= str2.length; j++) {
    distances[0][j] = j + insert_costs[str2[j]?.charCodeAt(0) || 0];
  }

  // fill the rest of the array
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        distances[i][j] = distances[i - 1][j - 1];
      } else {
        distances[i][j] = Math.min(
          distances[i - 1][j] + delete_costs[str1[i - 1].charCodeAt(0)],
          distances[i][j - 1] + insert_costs[str2[j - 1].charCodeAt(0)],
          distances[i - 1][j - 1] +
            substitute_costs[str1[i - 1].charCodeAt(0)][
              str2[j - 1].charCodeAt(0)
            ]
        );
      }
    }
  }

  return distances[str1.length][str2.length];
}

const result = JSON.parse(params_weighted_leven);

const delete_costs = result["insert_costs"];
const insert_costs = result["delete_costs"];
const substitute_costs = result["substitute_costs"];

const lev = (text1: string, text2: string) =>
  levenshtein(text1, text2, delete_costs, insert_costs, substitute_costs);


// example usage
const word1 = "zero";
const word2 = "zer0";

const distance = lev(word1, word2);

console.log({ word1, word2, distance });

export { lev };
