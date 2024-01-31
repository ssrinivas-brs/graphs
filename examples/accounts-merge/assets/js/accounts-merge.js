

// Algorithm
let accountsMerge = function (accounts) {
  const parents = {};
  const email2name = {};

  const find = (x) => {
    if (parents[x] !== x) {
      parents[x] = find(parents[x]);
    }

    return parents[x];
  };

  const union = (x, y) => {
    parents[find(x)] = find(y);
  };

  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      if (!parents[email]) {
        parents[email] = email;
      }

      email2name[email] = name;
      union(email, emails[0]);
    }
  }

  const emails = {};
  for (const email of Object.keys(parents)) {
    const parent = find(email);
    if (parent in emails) {
      emails[parent].push(email);
    } else {
      emails[parent] = [email];
    }
  }

  return Object.entries(emails).map(([email, x]) => [
    email2name[email],
    ...x.sort(),
  ]);
};

// Implementation
const mergedAccounts = accountsMerge([
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["Mary", "mary@mail.com"],
  ["John", "johnnybravo@mail.com"],
]);

console.log("The merged accounts for the given input is :");
console.log(mergedAccounts);

// BIG O Notation
// Time complexity -  O(N * M) - where N represents the number of accounts & M represents the average number of emails per account.
// Space complexity - O(N * M)
