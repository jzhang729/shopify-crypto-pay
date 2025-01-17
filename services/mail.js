const keys = require('../config/keys');
const constants = require('../constants');
const template = require('./emailTemplate');

const transport = require('mailgun-js')({
  apiKey: keys.MG_API_SECRET,
  domain: keys.MG_INBOX
});

const _getWalletAddress = symbol => {
  switch (symbol) {
    case 'ADA':
      return constants.CARDANO_WALLET;
      break;
    case 'ARK':
      return constants.ARK_WALLET;
      break;
    case 'BTC':
      return constants.BITCOIN_WALLET;
      break;
    case 'EOS':
      return constants.EOS_WALLET;
      break;
    case 'ETC':
      return constants.ETHEREUM_CLASSIC_WALLET;
      break;
    case 'ETH':
      return constants.ETHEREUM_WALLET;
      break;
    case 'GTO':
      return constants.GIFTO_WALLET;
      break;
    case 'ICX':
      return constants.ICON_WALLET;
      break;
    case 'INS':
      return constants.INS_WALLET;
      break;
    case 'LSK':
      return constants.LISK_WALLET;
      break;
    case 'LTC':
      return constants.LITECOIN_WALLET;
      break;
    case 'NEO':
      return constants.NEO_WALLET;
      break;
    case 'REQ':
      return constants.REQUEST_WALLET;
      break;
    case 'XLM':
      return constants.STELLAR_WALLET;
      break;
    case 'XRP':
      return constants.RIPPLE_WALLET;
      break;
    case 'NANO':
      return constants.NANO_WALLET;
      break;
    case 'VEN':
      return constants.VEN_WALLET;
      break;
    case 'ZRX':
      return constants.ZRX_WALLET;
      break;
    default:
      return 'No wallet address found for this currency';
  }
};

const _generateMailOptions = ({
  variantTitle,
  variantPriceUSD,
  email,
  firstName,
  lastName,
  address1,
  address2,
  city,
  stateProv,
  country,
  postalZip,
  productTitle,
  coinName,
  coinSymbol,
  _id,
  date,
  priceInCrypto
}) => {
  // Get coin wallet addresss from constants file based on symbol.
  const walletAddress = _getWalletAddress(coinSymbol);

  // Context is an object used by Handlebars to interpolate values inside of the e-mail body.
  const context = {
    _id,
    firstName,
    lastName,
    address1,
    address2,
    city,
    stateProv,
    country,
    postalZip,
    productTitle,
    variantTitle,
    variantPriceUSD,
    coinName,
    coinSymbol,
    date,
    priceInCrypto,
    walletAddress,
    companyName: constants.COMPANY_NAME,
    companyEmail: constants.COMPANY_EMAIL,
    companyPhone: constants.COMPANY_PHONE
  };

  // Use Handlebars to interpolate variables into the e-mail body
  const confirmation = template(context);

  const options = {
    from: `${constants.COMPANY_NAME} <info@headphones.com>`,
    to: email,
    bcc: keys.MAIL_RECIPIENTS,
    subject: `${constants.COMPANY_NAME} - Crypto Pay`,
    html: confirmation
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `inside development mode, sending email to ${email} and BCC ${
        keys.MAIL_RECIPIENTS
      }`
    );
  }

  return options;
};

exports.sendEmail = async args => {
  if (args.variantTitle === 'Default Title') {
    args.variantTitle = '';
  }

  const options = _generateMailOptions(args);

  try {
    const message = await transport.messages().send(options);
    console.log(message);
  } catch (err) {
    return console.log(err);
  }
};
