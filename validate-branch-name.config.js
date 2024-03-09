const branchName = require('current-git-branch')();

const isValidBranchName = /^(feat|refactor|chore|fix|init)\/RSS-PZ-\d+_[\w-]+$/.test(branchName);

if (!isValidBranchName) {
    console.error(`Invalid branch name: ${branchName}. Branch names must follow the specified format.`);
    process.exit(1);
}
