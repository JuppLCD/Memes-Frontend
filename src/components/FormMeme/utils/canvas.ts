import { MutableRefObject } from 'react';
import { FormMeme } from '../../../types/Form';

function wrapText(
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	maxWidth: number,
	lineHeight: number
) {
	const words = text.split(' ').reverse();
	let line = '';
	for (const [index, w] of words.entries()) {
		const testLine = line + w + ' ';
		const metrics = ctx.measureText(testLine);
		const testWidth = metrics.width;
		if (testWidth > maxWidth && index > 0) {
			ctx.fillText(line, x, y);
			line = w + ' ';
			y -= lineHeight;
		} else {
			line = testLine;
		}
	}
	ctx.fillText(line, x, y);
}

export const canvasImgMeme = (inputsData: FormMeme, imgMemeRef: MutableRefObject<HTMLImageElement | undefined>) => {
	if (imgMemeRef.current === undefined) return;

	// IMG
	imgMemeRef.current as HTMLImageElement;
	const img = imgMemeRef.current;

	const { naturalWidth, naturalHeight } = img;

	const proporcion = naturalHeight / naturalWidth;

	const maxWidthMemeImg = 500;
	const maxHeightMemeImg = proporcion * maxWidthMemeImg;

	// CANVAS
	const canvas = document.createElement('canvas');

	canvas.width = maxWidthMemeImg;
	canvas.height = maxHeightMemeImg;

	const ctx = canvas.getContext('2d');

	if (ctx === null) {
		// ! Tirar error
		return;
	}

	ctx.drawImage(img, 0, 0, maxWidthMemeImg, maxHeightMemeImg);

	inputsData.texts?.forEach((text) => {
		let maxWidthText = maxWidthMemeImg;

		ctx.font = `bold ${text.fs}px Arial`;
		ctx.fillStyle = text.color;
		if (ctx.measureText(text.text).width + text.x > maxWidthMemeImg) {
			const sobra = ctx.measureText(text.text).width + text.x - maxWidthMemeImg;
			maxWidthText = ctx.measureText(text.text).width - sobra;
		}
		const lineHeight = text.fs / 0.666;
		wrapText(ctx, text.text, text.x, maxHeightMemeImg - text.y, maxWidthText, lineHeight);
	});

	return canvas;
};
