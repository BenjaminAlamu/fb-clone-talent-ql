const mailgun = require("mailgun-js");
const apiKey = process.env.API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const logger = require("./logger");

const from_who = "FacebookClone <noreply@facebookclone.com>";

const mail_gun = new mailgun({ apiKey, domain });
let Mailgen = require("mailgen");
const generator = new Mailgen({
  theme: "default",
  product: {
    name: "FacebookClone",
    link: "https://facebook-clone-talentql-test.herokuapp.com/",
    logo: "https://res.cloudinary.com/dldd8ucby/image/upload/v1623519384/Screenshot_2021-06-12_at_18.35.55.png",
  },
});

module.exports = {
  sendRegister: async function (user, token) {
    const body = {
      body: {
        greeting: `Hi ${user.firstName}`,
        signature: `Best Regards`,
        intro: [
          `Welcome to FacebookClone.`,
          `You're getting this email because you (or someone who entered your email) decided to signup on FacebookClone.`,
          `To Verify your account, please enter the OTP (One Time Password) below to validate your account`,
          `<bold>${user.pin}</bold>`,
        ],
        outro: ``,
        action: {
          instructions: "",
          button: {},
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
        intro: [
          `FacebookClone here`,
          `You're getting this email because you (or someone who entered your email) and requested a password resey on FacebookClone.`,
          `To reset your password, please enter the OTP (One Time Password) below `,
          `<bold>${user.pin}</bold>`,
        ],
        outro: `If this wasnt you please ignore this mail`,
        action: {
          instructions: "",
          button: {},
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
