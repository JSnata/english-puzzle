const branchName = require('current-git-branch')();

const isValidBranchName = /^\/[A-Z]+-[A-Z]+-\d+_.*$/.test(branchName);

if (!isValidBranchName) {
    console.error(`Invalid branch name: ${branchName}. Branch names must follow the specified format.`);
    process.exit(1);
}
