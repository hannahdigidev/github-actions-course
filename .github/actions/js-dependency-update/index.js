const core = require('@actions/core');
const exec = require('@actions/exec');

const validateBranchName = ({ branchName }) => /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName);
const validateDirectoryName = ({ dirName }) => /^[a-zA-Z0-9_\-\/]+$/.test(dirName);



async function run() {

    const baseBranch = core.getInput('base-branch');
    const targetBranch = core.getInput('target-branch');
    const ghToken = core.getInput('gh-token');
    const workingDir = core.getInput('working-dir');
    const debugInput = core.getBooleanInput('debug');

    core.setSecret('ghToken');
    
    if (!validateBranchName({branchName: baseBranch})) {
        core.setFailed('Invalid base-branch name. Branch names need to include chars, numbers, hypens underscores and forward-slashes');
        return;
    }
    if (!validateBranchName({branchName: baseBranch})) {
        core.setFailed('Invalid target-branch name. Branch names need to include chars, numbers, hypens underscores and forward-slashes');
        return;
    }

    if(!validateDirectoryName({dirName: workingDir})) {
        core.setFailed('invalid directory name. They are the same as the branch names');
        return;
    }

    core.info(`[js-dependency-update] : base-branch is ${baseBranch} `);
    core.info(`[js-dependency-update] : target-branch is ${targetBranch}`);
    core.info(`[js-dependency-update]: working-directory is ${workingDir}`);


    await exec.exec('npm update', [], {
        cwd: workingDir
    });

    const gitStatus = await exec.getExecOutput('git status -s package*.json', [], {
        cwd: workingDir
    });

    if (gitStatus.stdout.length > 0) {
        core.info('[js-dependency-update] : There are updates available')
    } else {
        core.info('[js-dependency-update]: There are no updates available')
    }
    /*
    [DONE ] 1 parse inputs 
       1.1 - base branch 
        1.2 . target branch create - pr 
        1.3 . github token for auth - to create prs
        1.4 . working dir for checking deps
    [ Done] - 2. execute npm update command in working dir
     3. - update workflow.

     */

    core.info('I am a custom JS action');
}
run();