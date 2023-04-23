const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;
const auth_link = 'https://developers.google.com/oauthplayground';

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH_TOKEN } =
  process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH_TOKEN,
  auth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });

  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Focebook email verification',
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Account</title>
        <style>
          #header {
            max-width: 700px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: Roboto;
            font-weight: 600;
            color: #3b5998;
          }
          #sub-body {
            padding: 1rem 0;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            color: #141823;
            font-size: 17px;
            font-family: Roboto;
          }
          #link{
            width: 200px;
            padding: 10px 15px;
            background: #4c649b;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-family: Roboto;
          }
        </style>
      </head>
      <body>
        <div id="header">
          <img
            src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png"
            alt=""
            width="30px"
          />
          <span>Action requires : Activate your facebook account.</span>
        </div>
        <div id="sub-body">
          <span>Hello ${name}</span>
          <div style="padding: 20px 0">
            <span style="padding: 1.5rem 0"
              >You recently created an account on Facebook. To complete your
              registration, please confirm your account.</span
            >
          </div>
          <a href=${url} id="link">Confirm your account</a>
          <br />
          <div style="padding-top: 20px;">
            <span style="margin: 1.5rem 0; color: #898f9c;">
              Facebook allows you to stay in touch with all your friend, once refistered
              on facebook, you can share photos, organize events and much more.
            </span>
          </div>
        </div>
      </body>
    </html>
    `,
  };
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
