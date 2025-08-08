import { test } from '@playwright/test';

// Group of tests with a tag on the describe block
test.describe('Describe Block 1', { tag: '@sanity' }, async () => {
  test('Practice Test 1 @UI', async () => {
    console.log('Practice Test 1');
  });

  test('Practice Test 2 @API', async () => {
    console.log('Practice Test 2');
  });

  test('Practice Test 3 @UI @smoke', async () => {
    console.log('Practice Test 3');
  });
});

// Individual tests with tags outside the describe
test('Practice Test 4', { tag: ['@UI', '@smoke', '@DB'] }, async () => {
  console.log('Practice Test 4');
});

test('Practice Test 5', { tag: ['@API'] }, async () => {
  console.log('Practice Test 5');
});


/*
Ways to run tests in groups with tags:

1. Run tests containing **either tag** (logical OR):
   - PowerShell:
     npx playwright test --grep ~"@tag1|@tag2|@tag3"
   - Batch (cmd.exe):
     npx playwright test --grep "@tag1|@tag2"
   - Bash:
     npx playwright test --grep "@tag1|@tag2|@tag3"

2. Run tests containing **both tags** (logical AND):
   - Use regex lookahead:
     npx playwright test --grep "(?=.*@tag1)(?=.*@tag2)"

3. Run tests **with a single tag**:
   npx playwright test --grep "@smoke"

4. Run all tests **except a tag** (NOT):
   npx playwright test --grep-invert "@wip"
*/
