
function linkExtract(linksArray) {
	return linksArray.map(link => Object.values(link).join());
}

async function checkURL(urlList) {
	return await Promise.all(urlList.map(async(url) => {
		try {
			const response = await fetch(url);
			return response.status;
		} catch (error) {
			return errorHandling(error)
		}
	}));
}

function errorHandling(error) {
	if(error.cause.code === 'ENOTFOUND') {
		return 'link not found'
	} else {
		return 'something is wrong'
	}
}

export async function listValidator(linksArray) {
	const links = await linkExtract(linksArray);
	const status = await checkURL(links)

	return linksArray.map((link, index) => ({
		...link,
		status: status[index]
	}))
}