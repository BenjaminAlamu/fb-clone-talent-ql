const mailgun = require("mailgun-js");
const apiKey = process.env.API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const logger = require("./logger");

const from_who = "MealGuruu <noreply@mealguru.com>";

const mail_gun = new mailgun({ apiKey, domain });
let Mailgen = require("mailgen");
const generator = new Mailgen({
  theme: "default",
  product: {
    name: "FacebookClone",
    link: "https://www.goal.com/en-gb",
    logo: "https://res.cloudinary.com/dldd8ucby/image/upload/v1600206672/Group_174.png",
  },
});

module.exports = {
  sendRegister: async function (user, token) {
    console.log("I am here");
    const body = {
      body: {
        greeting: `Hi ${user.firstName}`,
        signature: `Best Regards`,
        intro: ``,
        outro: `${user.pin}`,
        action: {
          instructions: `Welcome to FacebookClone. Please use the pin below to confirm your account`,
          button: {
            color: "#FFC700",
            text: "Verify Account",
            link: `${process.env.FE_ROUTE}/verify-account/${token}`,
          },
        },
      },
    };
    try {
      const data = {
        from: from_who,
        to: user.email,
        subject: "Sign Up",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };
      await mail_gun.messages().send(data);
      logger.info("Email sent");
    } catch (error) {
      logger.error(error);
    }
  },
  sendReset: async function (user, token) {
    const body = {
      body: {
        greeting: `Hi ${user.firstName}`,
        signature: `Best Regards`,
        intro: `Hi ${user.firstName}`,
        outro: `If this wasnt you please ignore this mail`,
        action: {
          instructions: [
            `A password reset application was gotten from your account. Please use the pin below to confirm your account.`,
            `${user.pin}`,
          ],
          button: {
            color: "#FFC700",
            text: "Reset Password",
            link: `${process.env.FE_ROUTE}/reset/${token}`,
          },
        },
      },
    };
    try {
      const data = {
        from: from_who,
        to: user.email,
        subject: "Password Reset",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      await mail_gun.messages().send(data);
      logger.info("Email sent");
    } catch (error) {
      logger.error(error);
    }
  },
};
