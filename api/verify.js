const { validate } = require('deep-email-validator');
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { email } = req.body;
    try { const result = await validate(email); return res.status(200).json({ valid: result.valid }); }
    catch (err) { return res.status(500).json({ valid: false }); }
};
