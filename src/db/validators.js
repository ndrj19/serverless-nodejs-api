const { z } = require("zod");

const validateLead = async (postData) => {
  const lead = z.object({ email: z.string().email() });

  let hasError;
  let validData = {};
  let message;
  try {
    validData = lead.parse(postData);
    hasError = false;
  } catch (err) {
    hasError = true;
    message = "Invalid email. Please try again.";
  }

  return {
    data: validData,
    hasError: hasError,
    message: message,
  };
};

module.exports = { validateLead };
