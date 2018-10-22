export const fetchWeather = async woeid => {
	const image = await fetch(`https://picsum.photos/200/300/?random`);

	return {
		image
	};
};