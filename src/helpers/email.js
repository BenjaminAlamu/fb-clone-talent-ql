const mailgun = require("mailgun-js");
const apiKey = process.env.API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const from_who = "MealGuruu <noreply@mealguru.com>";

const mail_gun = new mailgun({ apiKey, domain });
let Mailgen = require("mailgen");
const generator = new Mailgen({
  theme: "default",
  product: {
    name: "MealGuruu",
    link: "https://www.goal.com/en-gb",
    logo:
      "https://res.cloudinary.com/dldd8ucby/image/upload/v1600206672/Group_174.png",
  },
});

module.exports = {
  sendRegister: async function (user, token) {
    try {
      const body = {
        body: {
          greeting: `Hi ${user.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          intro: `Hi ${user.fullName.split(" ")[0]}`,
          outro: `${user.pin}`,
          action: {
            instructions: `Welcome to MealGuruu. Please use the pin below to confirm your account`,
            button: {
              color: "#FFC700",
              text: "Verify Account",
              link: `${process.env.FE_ROUTE}/verify-account/${token}`,
            },
          },
        },
      };

      const data = {
        from: from_who,
        to: user.email,
        subject: "Sign Up",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
      Bugsnag.notify(JSON.stringify(err));
    }
  },
  sendReset: async function (user, token) {
    try {
      const body = {
        body: {
          greeting: `Hi ${user.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          intro: `Hi ${user.fullName.split(" ")[0]}`,
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
      const data = {
        from: from_who,
        to: user.email,
        subject: "Password Reset",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          let err = {
            issue: err2.toString(),
            environment: process.env.APP_ENVIRONMENT,
          };
          Bugsnag.notify(JSON.stringify(err));
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
      Bugsnag.notify(JSON.stringify(err));
    }
  },
  sendVendorRegister: async function (user, token) {
    try {
      const body = {
        body: {
          greeting: `Hi ${user.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          action: {
            instructions: `Welcome to MealGuruu.`,
            button: {
              color: "#FFC700",
              text: "Verify Account",
              link: `${process.env.FE_ROUTE}/verify-account/${token}`,
            },
          },
        },
      };

      const data = {
        from: from_who,
        to: user.email,
        subject: "Sign Up",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
      Bugsnag.notify(JSON.stringify(err));
    }
  },
  sendVendorReset: async function (user, token) {
    try {
      const body = {
        body: {
          greeting: `Hi ${user.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          intro: `Hi ${user.fullName.split(" ")[0]}`,
          outro: `If this wasnt you please ignore this mail`,
          action: {
            instructions: [
              `A password reset application was gotten from your account. Please use link below to reset your password`,
            ],
            button: {
              color: "#FFC700",
              text: "Reset Password",
              link: `${process.env.FE_ROUTE}/reset/${token}`,
            },
          },
        },
      };
      const data = {
        from: from_who,
        to: user.email,
        subject: "Password Reset",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          let err = {
            issue: err2.toString(),
            environment: process.env.APP_ENVIRONMENT,
          };
          Bugsnag.notify(JSON.stringify(err));
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
      Bugsnag.notify(JSON.stringify(err));
    }
  },
  sendVendorPurchase: async function (
    user,
    vendor,
    purchase,
    price,
    restaurant
  ) {
    try {
      const body = {
        body: {
          greeting: `Hi ${vendor.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          intro: ` ${user.fullName} just made a purchase worth ${price} from ${restaurant}`,
          table: { data: purchase },
          action: {
            instructions: ``,
            button: {},
          },
        },
      };

      const data = {
        from: from_who,
        to: user.email,
        subject: "Meal Purchase",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
    }
  },
  sendUserPurchase: async function (user, purchase, restaurant) {
    try {
      const body = {
        body: {
          greeting: `Hi ${user.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          intro: ` You just purchaded the following items from ${restaurant}`,
          table: { data: purchase },
          action: {
            instructions: ``,
            button: {},
          },
        },
      };

      const data = {
        from: from_who,
        to: user.email,
        subject: "Meal Purchase",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
    }
  },
  sendMealUpdate: async function (reciever, message, order) {
    try {
      const body = {
        body: {
          greeting: `Hi ${reciever.fullName.split(" ")[0]}`,
          signature: `Best Regards`,
          intro: `Your order: ${order.code} has a new update`,
          outro: message,
          action: {
            button: {},
          },
        },
      };
      const data = {
        from: from_who,
        to: reciever.email,
        subject: "Password Reset",
        text: generator.generatePlaintext(body),
        html: generator.generate(body),
      };

      mail_gun.messages().send(data, function (err2, body) {
        if (err2) {
          let err = {
            issue: err2.toString(),
            environment: process.env.APP_ENVIRONMENT,
          };
          Bugsnag.notify(JSON.stringify(err));
          res.status(500).send({
            status: "error",
            message: "An error occurred, Please try again",
            error: err2.toString(),
          });
        } else {
        }
      });
    } catch (error) {
      let err = {
        issue: error.toString(),
        environment: process.env.APP_ENVIRONMENT,
      };
      console.log({ err });
    }
  },
};
