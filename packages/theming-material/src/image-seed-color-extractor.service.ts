import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { QuantizerCelebi, Score } from '@material/material-color-utilities';

@Injectable({ providedIn: 'root' })
export class ImageSeedColorExtractor {
  protected pixels = inject(ImagePixelExtractor);
  /**
   * Extracts seed colors from the image at the given URL, sorted by relevance.
   * @param url
   * @returns
   */
  async fromUrl(url: string): Promise<number[]> {
    const pixels = await this.pixels.fromUrl(url, [128, 128]);
    const colors = Score.score(QuantizerCelebi.quantize(pixels, 128));
    return colors;
  }
}

@Injectable({ providedIn: 'root' })
export class ImagePixelExtractor {
  private document = inject(DOCUMENT);

  /**
   * Extracts the pixels as argb numbers from the image at the given URL.
   * @param url
   * @param boundBox Scale the image to fit within this box.
   * @returns
   */
  async fromUrl(
    url: string,
    boundBox: [w: number, h: number],
  ): Promise<number[]> {
    const canvas = this.document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Context not available');

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onerror = reject;
      img.onload = () => resolve(img);
      img.src = url;
    });

    const scaleRatio = Math.min(...boundBox) / Math.max(img.width, img.height);
    const width = img.width * scaleRatio;
    const height = img.height * scaleRatio;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelsArgb = new Array<number>(imageData.data.length / 4);

    // Copilot generated.
    /* eslint-disable no-bitwise */
    for (let i = 0; i < imageData.data.length; i += 4)
      pixelsArgb[i / 4] =
        (imageData.data[i + 3] << 24) | // alpha
        (imageData.data[i] << 16) | // red
        (imageData.data[i + 1] << 8) | // green
        imageData.data[i + 2]; // blue

    return pixelsArgb;
  }
}
