import React, { CSSProperties, useCallback, useMemo } from 'react';
import { ChevronLeftIcon } from 'tdesign-icons-react';
import ClassNames from 'classnames';
import useConfig from '../_util/useConfig';
import { StyledProps } from '../common';
import { TdNavbarProps } from './type';
import { navbarDefaultProps } from './defaultProps';
import parseTNode from '../_util/parseTNode';

export interface NavbarProps extends TdNavbarProps, StyledProps {}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const {
    visible,
    title,
    children,
    titleMaxLength,
    leftArrow,
    left,
    capsule,
    right,
    fixed,
    animation,
    className,
    style,
    onLeftClick,
    onRightClick,
  } = props;
  const { classPrefix } = useConfig();
  const prefix = useMemo(() => `${classPrefix}-navbar`, [classPrefix]);
  const animationSuffix = useMemo(() => (animation ? '-animation' : ''), [animation]);

  const cls = useCallback((name?: string) => (name ? `${prefix}__${name}` : prefix), [prefix]);

  // 左侧胶囊区域
  const leftCapsuleContent = useMemo(() => {
    if (!capsule) {
      return null;
    }
    return <div className={cls('capsule')}>{capsule}</div>;
  }, [capsule, cls]);

  const titleChildren = useMemo(() => {
    let titleNode = parseTNode(children) || parseTNode(title);
    const isStringTitle = typeof titleNode === 'string';

    if (isStringTitle && !isNaN(titleMaxLength)) {
      if (titleMaxLength <= 0) {
        console.warn('titleMaxLength must be greater than 0');
      } else if (titleNode.length > titleMaxLength) {
        titleNode = `${titleNode.slice(0, titleMaxLength)}...`;
      }
    }

    return isStringTitle ? <span className={cls('center-title')}>{titleNode}</span> : titleNode;
  }, [children, cls, title, titleMaxLength]);

  // 右侧icon
  const rightContent = useMemo(
    () =>
      right ? (
        <div className={cls('right')} onClick={onRightClick}>
          {parseTNode(right)}
        </div>
      ) : null,
    [cls, right, onRightClick],
  );

  const navClass = useMemo<string>(
    () =>
      ClassNames(
        prefix,
        { [`${prefix}--fixed`]: fixed },
        visible ? `${prefix}--visible${animationSuffix}` : `${prefix}--hide${animationSuffix}`,
      ),
    [prefix, fixed, visible, animationSuffix],
  );

  const navStyle = useMemo<CSSProperties>(
    () => ({
      position: fixed ? 'fixed' : 'relative',
      ...style,
    }),
    [fixed, style],
  );

  return (
    <div className={ClassNames(navClass, className)} style={navStyle}>
      {fixed && <div className={cls('placeholder')}></div>}
      <div className={cls(`content`)}>
        <div className={cls(`left`)} onClick={onLeftClick}>
          {leftArrow && <ChevronLeftIcon className={cls('left-arrow')} />}
          {parseTNode(left)}
          {leftCapsuleContent}
        </div>
        <div className={cls(`center`)}>{titleChildren}</div>
        {rightContent}
      </div>
    </div>
  );
};

Navbar.defaultProps = navbarDefaultProps;

export default Navbar;
