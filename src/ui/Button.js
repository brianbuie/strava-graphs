import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as StravaIcon } from '../static/strava-symbol.svg';

function sizeMap(size) {
  switch (size) {
    case 'small':
      return '0.7rem';
    case 'large':
      return '1.2rem';
    default:
      return size || '0.9rem';
  }
}

function themeMap(theme) {
  const link = { color: 'link', pad: 'none' };
  switch (theme) {
    case 'strava':
      return { bkg: 'stravaOrange', color: 'white', DefaultIcon: StravaIcon };
    case 'plain':
      return { color: 'text', border: true };
    case 'link':
      return link;
    default:
      return link;
  }
}

const LinkStyles = styled.span`
  display: inline-block;
  a {
    display: inline-block;
  }
`;

const StyledButton = styled.button`
  border: ${({ border, color, theme }) => (border ? `1px solid ${theme[color || 'text']}` : 0)};
  border-radius: 0.25em;
  font-size: ${({ size }) => sizeMap(size)};
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  padding: ${({ pad }) => (pad === 'none' ? 0 : '0.55em 1.1em')};
  margin: 0;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  flex-grow: ${({ grow }) => (grow ? '1' : '0')};
  width: ${({ grow }) => (grow ? '100%' : 'auto')};
  background: ${({ bkg, theme }) => (bkg ? theme[bkg] : 'none')};
  color: ${({ color, theme }) => theme[color || 'text']};
  transition: all ${({ theme }) => theme.timing}ms ease;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  path,
  polygon {
    fill: ${({ color, theme }) => theme[color || 'text']};
  }
  .icon {
    height: 1.25em;
    svg {
      width: 1.25em;
      height: 1.25em;
    }
  }
  .text {
    font-weight: bold;
    text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  }
  span:nth-child(2) {
    margin-left: 0.5em;
  }
`;

const Button = ({ label, children, Icon, theme, ...props }) => {
  const { DefaultIcon, ...themeProps } = themeMap(theme);
  const RenderIcon = Icon || DefaultIcon;
  const mergedProps = { ...themeProps, ...props };
  return (
    <StyledButton {...mergedProps}>
      {RenderIcon && (
        <span className="icon">
          <RenderIcon size={sizeMap(props.size)} />
        </span>
      )}
      {label && <span className="text">{label}</span>}
      {children && <span className="text">{children}</span>}
    </StyledButton>
  );
};

const withLink = Button => ({ withLink, ...props }) => {
  if (!withLink) return <Button {...props} />;
  return (
    <LinkStyles>
      {withLink.href ? (
        <a {...withLink}>
          <Button {...props} />
        </a>
      ) : (
        <Link {...withLink}>
          <Button {...props} />
        </Link>
      )}
    </LinkStyles>
  );
};

export default withLink(Button);
