import fsPromises from "fs/promises";
import path from "path";

async function mergeLeetcodeAndCodeforcesData() {

// 1. Read and parse the files
const cfPath = path.resolve("./problems/leetcodeProblems.json");
const lcPath = path.resolve("./problems/codeforcesProblems.json");

const cfData = JSON.parse(await fsPromises.readFile(cfPath), 'utf8'); //Coverted JSON Object to Javascript Object
const lcData = JSON.parse(await fsPromises.readFile(lcPath), 'utf8');

// 2. Merge the data (using spread operator for objects)
const combineData = [...cfData, ...lcData];//Combined 2 Javascript Objects

// 3. Write the combined data to a new file
await fsPromises.mkdir("./allProblemsData", {recursive: true});
await fsPromises.writeFile("./allProblemsData/allProblems.jsom",JSON.stringify(combineData,null,2));

console.log('Files merged successfully into merged.json');

}

mergeLeetcodeAndCodeforcesData();

//TODO -> Learn how to define custom scripts in package.json (Completed)