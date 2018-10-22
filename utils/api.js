export const getImageFromId = id => {
	return `https://picsum.photos/300/300?image=${id}`;
};

export const fetchImages = async () => {
	const response = await fetch('https://unsplash.it/list');
	const images = await response.json();

	return images;
};