import { FC } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { NextLink, NextLinkProps } from './links';

export type ImageProps = NextImageProps & Partial<Pick<NextLinkProps, 'href'>>;

export const Image: FC<ImageProps> = (props) => {
  const { href, ...rest } = props;

  const nextImage = <NextImage {...rest} />;

  if (!href) {
    return nextImage;
  }

  return <NextLink href={href}>{nextImage}</NextLink>;
};
