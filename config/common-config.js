export const headerOptions = (data) => {
	return {
		method: "post",
		body: JSON.stringify(data),
		headers: { "Content-type": "application/json" },
	};
};
