import { test as baseTest } from "@playwright/test"

type MyFixture = {
    loginData: any;
    testData: any;
}

export const test = baseTest.extend<MyFixture>({

    loginData: {
        uname: "Admin",
        pwd: "admin123"
    },

    testData: {
        fname: "Sam",
        mname: "Javid",
        lname: "Mamm",
        email: "jm@gmail.com"
    }
})