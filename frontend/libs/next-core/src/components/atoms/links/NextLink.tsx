import { forwardRef, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';

export type NextLinkProps = PropsWithChildren<LinkProps>;

export const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => {
  const { children, href, replace, scroll, shallow, prefetch, locale, ...rest } = props;

  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

NextLink.displayName = 'NextLink';
