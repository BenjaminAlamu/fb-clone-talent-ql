require("dotenv").config();
process.env.PORT = 7777;
process.env.DB_CONN = `${process.env.DB_CONN}_test`;
const bcrypt = require("bcryptjs");

let app = require("../index");
let mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;
const { Post, User } = require("../models");

chai.use(chaiHttp);
//Our parent block
describe("Authentication", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  describe("/POST register", () => {
    it("Successfully create a user", async (done) => {
      const hashedPassword = await bcrypt.hash("password", 10);
      let user = {
        firstName: "Benjamin",
        lastName: "Alamu",
        phoneNumber: "45678",
        email: "oluwaseunalamu@gmail.com",
        password: hashedPassword,
      };

      chai
        .request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.data.user);
          assert.isDefined(res.body.data.token);
          done();
        });
    });
  });
  describe("/POST login", () => {
    it("user can login with created details", async (done) => {
      let user = {
        email: "oluwaseunalamu@gmail.com",
        password: "password",
      };
      const hashedPassword = await bcrypt.hash("password", 10);
      const created_user = new User({
        firstName: "Benjamin",
        lastName: "Alamu",
        phoneNumber: "45678",
        email: "oluwaseunalamu@gmail.com",
        password: hashedPassword,
      });

      await created_user.save();

      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.data.user);
          assert.isDefined(res.body.data.token);
          done();
        });
    });

    it("Login should fail on wrong details", async (done) => {
      let user = {
        email: "oluwaseunalamu@gmail.com",
        password: "passwor",
      };

      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, "Invalid email or password");
          done();
        });
    });
  });
  describe("/POST Password reset", () => {
    let resetToken;
    it("Should send reset password mail", async (done) => {
      const hashedPassword = await bcrypt.hash("password", 10);
      const created_user = new User({
        firstName: "Benjamin",
        lastName: "Alamu",
        phoneNumber: "45678",
        email: "oluwaseunalamu@gmail.com",
        password: hashedPassword,
      });

      await created_user.save();
      let data = {
        email: "oluwaseunalamu@gmail.com",
      };

      chai
        .request(app)
        .post("/api/v1/auth/forgot/password")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.message,
            "Reset Information has been sent to your email"
          );
          resetToken = res.body.data.token;
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.data.token);
          done();
        });
    });

    it("Should fail if an invalid mail is entered", async (done) => {
      let data = {
        email: "oluwaseunalamu@gmail.cm",
      };

      chai
        .request(app)
        .post("/api/v1/auth/forgot/password")
        .send(data)
        .end((err, res) => {
          res.should.have.status(500);
          assert.equal(res.body.message, "Invalid user");
          done();
        });
    });
  });

  // Forgot Password
  // Reset Password
  //
  // describe("/GET book", () => {
  //   it("it should GET all the post", (done) => {
  //     chai
  //       .request(server)
  //       .get("/api/v1/post/more")
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         // res.body.should.be.a("array");
  //         // res.body.length.should.be.eql(0);
  //         done();
  //       });
  //   });
  // });
});
