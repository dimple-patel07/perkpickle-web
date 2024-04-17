export const sendGoogleAnalytics = (tagName, eventName, params) => {
	window.gtag(tagName, eventName, params);
};
