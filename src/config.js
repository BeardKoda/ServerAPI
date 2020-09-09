const config ={
	API: process.env.UAPI || 'http://localhost:9090/api/v1/universal',
	secret: process.env.secret_key || 'PRTSECK_TEST_E5A273E9EACC1A40AFA140BC00BA4A'
}
module.exports = config;