const resetPasswordTemplate = (user, token) => {
  const { email } = user;
  const template = {
    to: email,
    from: 'noreply@bizhrm.com',
    subject: 'Password Reset Link',
    html: `
    <p>You requested a password reset.</p>
    <p>
        <a href="${process.env.REDIRECT_DOMAIN}/reset?token=${token}">
        Click here
        </a>
        to reset your password
    </p>
    `,
  };

  return template;
};

exports.resetPasswordTemplate = resetPasswordTemplate;
