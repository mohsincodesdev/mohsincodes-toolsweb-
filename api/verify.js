const dns = require('dns').promises;
const validator = require('validator');
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { email } = req.body;
    if (!email || !validator.isEmail(email)) return res.status(200).json({ valid: false });
    try {
        const domain = email.split('@')[1];
        const addresses = await dns.resolveMx(domain);
        return res.status(200).json({ valid: addresses && addresses.length > 0 });
    } catch (e) { return res.status(200).json({ valid: false }); }
};
