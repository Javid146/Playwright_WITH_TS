import { test } from "../fixtures/MyCustomFixtures"


test("Practice Fixture 1", async({testFixture, workerFixture})=>{

    //These values passed to console by use(...) in MyCustomFixtures file. Otherwise they would not work
    console.log(testFixture); 
    console.log(workerFixture);
})


test("Practice Fixture 2", async({testFixture, workerFixture})=>{
    console.log()
    console.log(testFixture);
    console.log(workerFixture);

})

/* 
    workerFixture:
  - Runs ONCE per worker (not per test)
  - Shared across all tests in that worker thread
  - Good for expensive setup (e.g., DB, server, browser context)
  - use(...) provides value to tests. line 20 and 38 in MyCustomFixtures file are values passed by use(). Otherwise test would fail
  - Teardown runs AFTER all tests in that worker finish
*/
