//
// Author:  Matt Lavery
// Date:    28/09/2018
// Purpose: Module for providing standard debug logging across Javascript / Typescript apps
//
// When         Who         What
// ------------------------------------------------------------------------------------------
//

export class DebugLogHelper {

    // properties
    private callerName: string;
    private environmentName: string;
    private showInProdEnv: boolean;
    private showInTestEnv: boolean;

    constructor (
    ) {
        this.callerName = '';
        this.environmentName = '';
        this.showInProdEnv = false;
        this.showInTestEnv = false;
    }

    /** Log a debug message if not production */
    logmsg(message: string, msgPrefix: string = '') {
        try {
            // determine if we need to show the msg based on the environment
            let sendToConsole: boolean;
            sendToConsole = false;
            if ((this.getEnvironment() === 'production' || this.getEnvironment() === 'prod') && this.showInProdEnv) {
                sendToConsole = true;
            }
            if ((this.getEnvironment() === 'test' || this.getEnvironment() === 'uat') && this.showInTestEnv) {
                sendToConsole = true;
            }
            if (this.getEnvironment() === 'dev') {
                sendToConsole = true;
            }

            // log the message to the console if required
            if (sendToConsole) {
                console.log(`${this.getMsgPrefix(msgPrefix)}>>> ` + message);
            }
        } catch(err) {
            console.log(`FATALERR: Error in DebugLogHelper.logmsg: ${JSON.stringify(err)}`);
        }
        
    }

    // helper function to format the message prefix
    private getMsgPrefix(msgPrefix: string): string {
      let tmpPrefix: string;
      if (this.callerName.length > 0 && msgPrefix.length > 0) {
        tmpPrefix = `${this.callerName}:${msgPrefix}`;
      } else if (this.callerName.length > 0) {
        tmpPrefix = this.callerName;
      } else {
        tmpPrefix = msgPrefix;
      }
      return tmpPrefix;
    }

    // helper function to get the environment
    private getEnvironment(): string {
        if (this.environmentName.length > 0) {
            return this.environmentName.toLowerCase();
        } else {
            // assume dev environment
            return 'dev';
        }
    }
}
