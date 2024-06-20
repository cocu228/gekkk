import { writeFileSync } from "fs";
import path from "path"; // Add this line
import packageJsonPath from "./package.json" assert { type: "json" };

try {
  const project = process.argv.slice(2)[0];
  const projectVersion = `${project}-version`;
  const versionSegments = packageJsonPath[projectVersion].split(".");

  console.log(versionSegments);

  //Version increment
  versionSegments[2] = (parseInt(versionSegments[2]) + 1).toString();

  packageJsonPath[projectVersion] = versionSegments.join(".");

  writeFileSync(path.resolve(process.cwd(), "package.json"), JSON.stringify(packageJsonPath, null, 2));

  console.log(`Version incremented to ${packageJsonPath[projectVersion]}`);
} catch (error) {
  console.error("Error incrementing version:", error);
  process.exit(1);
}
