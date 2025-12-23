const core = require('@actions/core');


async function run() {
    /*
    1 parse inputs 
       1.1 - base branch 
        1.2 . target branch create - pr 
        1.3 . github token for auth - to create prs
        1.4 . working dir for checking deps
    2. execute npm update command in working dir 
    

     */
    core.info('I am a custom JS action');
}
run();