'use strict';
const axios = require('axios');

const meta = {
	options: {
		port: { type: "number", defaultsTo: 80 },
		protocol: { type: "string", oneOf: ["http", "https"], defaultsTo: "http" },
		path: { type: "string", defaultsTo: "/"},
		description: { type: "string" }
	}
};

class HTTPPlugin
{
	constructor()
	{
		this.meta = meta;
	}

	async checkHostIPv4(ip, options)
	{
		var port = options.port || 80;
		var protocol = options.protocol || "http";
		var path = options.path || "/";
		var response = await axios.get(protocol + "://" + ip + ':' + port + path, {
			timeout: 2000
		}).catch(e => {
			return false;
		});
		
		if (response.status >= 200 && response.status <= 299) {
			return true;
		}

		return false;
	}

	async checkHost(hostname, options)
	{
		port = options.port || 80;
		var protocol = options.protocol || (port === 443 ? 'https' : 'http');
		try {
			const response = await axios.get(protocol + "://" + hostname + ':' + port + '/', {
				timeout: 2000
			});
		} catch(e) {
			return false;
		}

		console.log(response.status);
		if (response.status >= 200 && response.status <= 299) {
			return true;
		}

		return false;
	}

	async checkHostIPv6(ip, options)
	{
		port = options.port || 80;
		var protocol = options.protocol || "http"
		const response = await axios.get(protocol + "://" + hostname + ':' + port + '/');

		if (response.status >= 200 && response.status <= 299) {
			return true;
		}

		return false;
	}
}

module.exports = HTTPPlugin;