const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { category } = event.queryStringParameters || {};
  if (!category) return { statusCode: 400, body: "Missing category" };

  try {
    const res = await fetch(`https://openlibrary.org/subjects/${category}.json`);
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
