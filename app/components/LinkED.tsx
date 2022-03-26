import type { LinkProps } from 'remix';
import { Link, useLocation, useResolvedPath } from 'remix';

/** Link that supports keeping the year search param */
export const LinkED = ({ children, to, ...props }: LinkProps) => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const year = searchParams.get('year');

  const toPath = useResolvedPath(to);

  if (year) {
    const toSearchParams = new URLSearchParams(toPath.search);
    toSearchParams.set('year', year);
    toPath.search = toSearchParams.toString();
  }

  return (
    <Link to={toPath} {...props}>
      {children}
    </Link>
  );
};
