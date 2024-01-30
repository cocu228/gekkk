import {writeFileSync} from 'fs';
import path from 'path'; // Add this line
import {exec} from 'child_process';
import packageJsonPath from './package.json' assert {type: 'json'};
import versionsJsonPath from './versions.json' assert {type: 'json'};


try {
    const versionSegments = packageJsonPath.version.split('.');
    
    console.log(versionSegments);
    
    //Version increment
    versionSegments[2] = (parseInt(versionSegments[2]) + 1).toString();
    
    packageJsonPath.version = versionSegments.join('.');
    
    writeFileSync(
       path.resolve(process.cwd(), 'package.json'),
       JSON.stringify(packageJsonPath, null, 2));
    
    console.log(`Version incremented to ${packageJsonPath.version}`);
    
    // Version description generation
    exec('git log -1 --pretty=%B', (error, commitMessage) => {
        if (error) throw error;
        
        versionsJsonPath.unshift({
            version: packageJsonPath.version,
            date: new Date(Date.now()),
            description: commitMessage
        });
        
        writeFileSync(
            path.resolve(process.cwd(), 'versions.json'),
            JSON.stringify(versionsJsonPath, null, 2));

        console.log(`Version description: ${commitMessage}`);
    });
} catch (error) {
    console.error('Error incrementing version:', error);
    process.exit(1);
}
