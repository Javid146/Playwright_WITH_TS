import { test as baseTest } from "@playwright/test"

//It’s like saying: "I expect a value named testFixture of type any to exist in the test context
type testFixtures = {
    testFixture: any;
}

type workerFixtures = {  //type is used to define data structure for values like objects, function shapes, or variables
    workerFixture: any;
}

//baseTest is just alias for test define above. extend<> in Playwright = add custom fixtures
export const test = baseTest.extend<testFixtures, workerFixtures>({

    testFixture: async ({ }, use) => {  //The value you pass to use(...) = what the test receives. 

        const messageOfTestFixture = "I am Test Fixture 1"
        console.log("Before part of Test Fixture 1")

        await use(messageOfTestFixture);
        console.log("After part of Test Fixture 1")
    },


    /* Why is it an array? Because Playwright needs extra options (metadata) for some fixtures, and the array allows you to:
       workerFixture: [ async ({}, use) => { ... }, { scope: "worker" } ]
       This is my fixture function, and I want it to run once per worker, not once per test.

       Why does the test fixture above NOT need extra options? Because Playwright fixtures are test-scoped by default.

       So why [async({}, use)=> empty {} below?
       Because in your current fixture, you are not using any other fixture from context, so it’s just an empty destructured object.
    */
    workerFixture: [async ({ }, use) => {

        const messageOfWorkerFixture = "I am Worker Fixture 1"
        console.log("Before part of Worker Fixture 1")

        await use(messageOfWorkerFixture);
        console.log("After part of Worker Fixture 1")
    }, { scope: "worker" }]

})