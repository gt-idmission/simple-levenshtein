export function lev(str1: string, str2: string) {
  // to store the distances
  let distances = new Array(str1.length + 1);
  for (let i = 0; i <= str1.length; i++) {
    distances[i] = new Array(str2.length + 1);
  }

  // first row and column
  for (let i = 0; i <= str1.length; i++) {
    distances[i][0] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    distances[0][j] = j;
  }

  // fill the rest of the array
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        distances[i][j] = distances[i - 1][j - 1];
      } else {
        distances[i][j] =
          Math.min(
            distances[i - 1][j],
            distances[i][j - 1],
            distances[i - 1][j - 1]
          ) + 1;
      }
    }
  }

  return distances[str1.length][str2.length];
}

const word1 = "Levenshtein";
const word2 = "Distance";
const distance = lev(word1, word2);

console.log({ word1, word2, distance });
