//This file will provide the JavaScript Code for Scraping Problems of the LeetCode Platform 
import puppeteer from "puppeteer";
import * as fsPromises from 'node:fs/promises';

async function scrapeLeetCodeProblems(){
    //Launch the browser using Puppeteer
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--disable-blink-features=AutomationControlled"] //This will help us to bypass specifc bot's that will hamper us in opening the browser 
    });

    //Open the New Tab
    const newTab = await browser.newPage();
    const page = newTab;
    //When opening the New Tab there can also be some bots that can cause some issue so we need to overcome them as well 
    //We will have to make our puppeter act like a user is accessing the browser 
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    );

    //Go to LeetCode URL
    await page.goto("https://leetcode.com/problemset/",{
        waitUntil: "domcontentloaded"
    });

    //Select all the anchor tag HTML Elemets
    const tagsThatNeedToScrape = ".group.flex.flex-col.rounded-\\[8px\\].duration-300";

    //Taking care of Lazy Loading and Scraping the Questions
    let questionsArray = []; //This is an Array 
    let prevCnt = 0;
    const targetCnt = 500;

    while (questionsArray.length < targetCnt){
        await page.evaluate((tagsThatNeedToScrape) => {
            //Get all the Elements with class name same as that of our selector 
            const problemsOnTheCurrentPage = document.querySelectorAll(tagsThatNeedToScrape);

            //Now we will check that did we fetch some problems or not. 
            // If yes, then we will go to the last problem on the page so that Lazy Loading can take place and more problems can load on the page 
            if(problemsOnTheCurrentPage.length){

                //Go the Last problem on the page and let the Lazy Loading to take place 
                problemsOnTheCurrentPage[problemsOnTheCurrentPage.length - 1].scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
        },tagsThatNeedToScrape);

        //Now we will check if the Next Set of Problems were loaded on the page or not 
        await page.waitForFunction(
            (tagsThatNeedToScrape,prev) => document.querySelectorAll(tagsThatNeedToScrape).length > prev,
            {},
        tagsThatNeedToScrape,
        prevCnt);

        //Now we will get the List of Problems 
        const allProblems = await page.evaluate((tagsToScrape) => {
            const problemArrayList = Array.from(document.querySelectorAll(tagsToScrape)); 
            
            //Now from the List of Problems we need to get two things -> Title of the Problem, URL Of the Problem
            //We will convert the Array into another array 
            return problemArrayList.map(ele => ({

                title :ele
                    .querySelector(".ellipsis.line-clamp-1")
                    ?.textContent.trim()//.trim() removes any whiteSpace or any Blank Spaces in the textContent from start to the End
                    .split(". ")[1],//Splits the textContent that we got from ". " and converts it into two parts, i.e -> [0] = part of string before the "." and [1] = part of string after the ". ". Then we will take the [1] Part of the String 

                url: ele.href,
            }));
        },tagsThatNeedToScrape);

        questionsArray = allProblems;

        //Now the prevCnt needs to be updated
        prevCnt = allProblems.length;
    }

    //Now we will make the Puppeteer to use the URL to open the Problem Link and get the Problem Description of the Question 
    let problemsWithDescription = []
    for(let i = 0 ; i < targetCnt ; i++){
            const problemName = questionsArray[i].title;
            const problemURL = questionsArray[i].url;
            const problemPage = await browser.newPage();
            try{
                await problemPage.goto(problemURL);

                //We will select the Tag that contains the Description 
                let description = await problemPage.evaluate(() => {
                    const descriptionDiv = document.querySelector( //Gets the Div that contains the Problem Statement
                        'div.elfjS[data-track-load="description_content"]'
                    );

                const paragraphs = descriptionDiv.querySelectorAll("p");// This gets all the Paragraphs 

                //Combine all the Paragraphs 
                let collectedDescriptions = [];
                //Will use the Iterator to iterate over the Paragraphs array and get the Descriptions 
                for(const p of paragraphs){
                    if(p.innerHTML.trim()==="&nbsp;"){
                        break;
                    }
                    collectedDescriptions.push(p.innerText.trim());
                }

                return collectedDescriptions.filter((text) => text != "").join("");
                });

                problemsWithDescription.push({problemName,problemURL,description});
                console.log(problemsWithDescription);
                }
                catch(err){
                    console.error(`Error fetching description for ${problemName} (${problemURL}):`,err);
                }                
                finally{
                    await problemPage.close();
                }
    }

await fsPromises.mkdir("./problems",{recursive: true});
await fsPromises.writeFile(
    './problems/leetcodeProblems.json',
    JSON.stringify(problemsWithDescription,null,2)
);

await browser.close();
}

async function scrapeCodeForcesProblems(params) {
         //Launch the browser using Puppeteer
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--disable-blink-features=AutomationControlled"] //This will help us to bypass specifc bot's that will hamper us in opening the browser 
    });

    //Open the New Tab
    const newTab = await browser.newPage();
    const page = newTab;
    //When opening the New Tab there can also be some bots that can cause some issue so we need to overcome them as well 
    //We will have to make our puppeter act like a user is accessing the browser 
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    );

    const cfProblems = [];
    const target = 20;

    //Go to CodeForces URL
    for(let i = 0 ; i < target ; i++){
        const codeforcesUrl = 'https://codeforces.com/problemset/page/${i}';

        await page.goto(codeforcesUrl,{
            waitUntil: "domcontentloaded",
        });

        const codeforcesProblemsSelector = "table.problems tr td:nth-of-type(2) > div:first-of-type > a"; 

        const links = await page.evaluate((sel) => {
            const listOfNodeElements = document.querySelectorAll(sel);
            return Array.from(listOfNodeElements).map((a) => a.href);
        },codeforcesProblemsSelector);

        for(let i = 0 ; i < target ; i++){
            const pageLink = links[i];

            try{
                page.goto(pageLink,{
                    waitUntil: "domcontentloaded"
                });

                //Now we want to get the Title and the Problem Description after reaching to that page;
                const{title,description} = await page.evaluate(() => {
                    const title = document.querySelector(".problem-statement .title")
                    .textContent.split(". ")[1];

                    const description = document.querySelector(".problem-statement > div:nth-of-type(2)").textContent;
                    
                    return {title,description};
            });
            cfProblems.push({
                title,
                url: pageLink,
                description,
            });
            } catch (err) {
                console.error(`!!!! Failed to Scrape the Problem: ${pageLink}`, err);
            }
        }
    }

    await fsPromises.mkdir("./problems",{recursive: true});
    await fsPromises.writeFile(
        './problems/codeforcesProblems.json',
        JSON.stringify(cfProblems,null,2)
    );
    await browser.close();
}

scrapeLeetCodeProblems();
scrapeCodeForcesProblems();