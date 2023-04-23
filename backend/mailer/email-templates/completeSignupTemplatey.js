const completeSignupTemplatey = (user, url) => {
  const { email, first_name } = user;
  console.log('url == ', url, 'Email === ', email);
  const template = {
    to: email,
    from: 'noreply@bizhrm.com',
    subject: 'Welcome to people connect',
    html: `
    <p>Hi ${first_name}, thank you for choosing bizHRM. Please use the link below to complete your registration.</p>
    <p>
        <a href="${url}">
        Click here
        </a>
        to complete your registration.
    </p>
    `,
  };

  return template;
};

exports.completeSignupTemplatey = completeSignupTemplatey;
