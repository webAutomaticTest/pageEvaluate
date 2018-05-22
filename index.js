const puppeteer = require('puppeteer');

test();

async function test(){
	const browser = await puppeteer.launch({headless: false, args:['--no-sandbox']});
	const page = await browser.newPage();
	await page.goto('https://twitter.com/login/');
	// await page.goto('https://www.baby-connect.com/home');
	// await page.goto('https://github.com/jpchip/baby-connect-nightmare');
	await page.waitFor(1000);
	console.log('candidateSelector');

	await page.addScriptTag({path:'./optimal-select.js'});
	console.log('after addScriptTag');
	let candidateSelector = await page.evaluate(scanCandidateAction);
	console.log(candidateSelector);
}

function scanCandidateAction() {
	let actions = [];
	let computeCSSSelector = window['OptimalSelect'].select;
	let aElements = document.querySelectorAll('a');
	for (let i=0 ; i < aElements.length ; i++) {
		if (! isMailTo(aElements[i])) actions.push(computeCSSSelector(aElements[i]));
	}

	return actions;

	function isMailTo(element) {
		let href = element.href;
		return href && (href.toLowerCase().indexOf('mailto') > -1)		
	}
}