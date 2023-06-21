const { Builder, By, Key, util } = require("selenium-webdriver");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function generateRandomEmailString() {
  const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
  let email = "";

  // Generate a random string of 10 characters for the email username
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    email += characters[randomIndex];
  }

  // Add a domain name to complete the email
  email += "@gmail.com";
  return email;
}

function generatePassword() {
  var pass = '';
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
          'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    
  for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random()
                  * str.length + 1);
        
      pass += str.charAt(char)
  }
    
  return pass;
}

async function automateEcom() {
  // Initialize Driver
  let driver = new Builder().forBrowser("chrome").build();
  driver.manage().window().maximize();

  // navigate to WebSite
  await driver.get("https://tutorialsninja.com/demo/");
  await sleep(1000);

  // navigate to registration page and register
  await driver.findElement(By.css("#top-links > ul > li.dropdown")).click();
  await sleep(1000);
  await driver
    .findElement(
      By.css("#top-links > ul > li.dropdown.open > ul > li:nth-child(1)")
    )
    .click();

  await sleep(1000);

  

  await sleep(1000);
  await driver.findElement(By.name("firstname")).sendKeys("Amit");
  await sleep(1000);

  await driver.findElement(By.name("lastname")).sendKeys("Raj");
  await sleep(1000);

  await driver
    .findElement(By.name("email"))
    .sendKeys(generateRandomEmailString());
  await sleep(1000);

  await driver.findElement(By.name("telephone")).sendKeys("8018989431");
  await sleep(1000);
  
  const password = generatePassword();
  await driver.findElement(By.name("password")).sendKeys(password);
  await sleep(1000);

  await driver.findElement(By.name("confirm")).sendKeys(password);
  await sleep(1000);

  await driver.findElement(By.name("agree")).click();
  await sleep(1000);
  await driver
    .findElement(By.xpath('//*[@id="content"]/form/div/div/input[2]'))
    .click();

  await sleep(1000);

  let isRegistrationSuccessful = false;
  try {
    const alertBox = await driver.findElement(
      By.css("#account-register > div.alert.alert-danger.alert-dismissible")
    );
    const displayValue = await alertBox.getCssValue("display");
    isRegistrationSuccessful = false;
  } catch (error) {
    console.log(error.message);
    isRegistrationSuccessful = true;
  }

  if (isRegistrationSuccessful) {
    // navigate back to main page and search for products
    await driver.findElement(By.xpath('//*[@id="logo"]/h1/a')).click();
    await sleep(1000);
    await driver.findElement(By.name("search")).sendKeys("iMac", Key.RETURN);
    await sleep(2000);
    const pixelsToScroll = 450;
    driver.executeScript(`window.scrollBy(0, ${pixelsToScroll});`);
    await sleep(2000);
  } else {
    console.log("Registration Failed as Email Address already registered");
  }

  // Close the browser window
  driver.close();
}

automateEcom();
