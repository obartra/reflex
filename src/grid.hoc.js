// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'
import { getDisplayName, getSpacingClasses } from './utils'
import type { Dev, AlignGrid, Justify, Size, Spacing } from './types'
import Padding from './padding'
import styles from './grid.css'
import devStyles from './dev.css'

export type Props = {
  dev?: Dev,
  align?: AlignGrid,
  children?: Element | Array<Element>,
  className?: string,
  justify?: Justify,
  margin?: Spacing,
  padding?: Spacing,
  size?: Size,
}

export default function Grid(Component: any) {
  return class withGrid extends React.Component {
    props: Props

    static defaultProps = {
      margin: [],
    }

    static contextTypes = {
      devMode: PropTypes.bool,
    }

    render() {
      const {
        dev,
        align,
        children,
        className,
        justify,
        margin,
        padding,
        size,
        ...props
      } = this.props

      const classes = compact([
        ...getSpacingClasses(margin),
        className,
        size && styles.col,
        size && styles[`col-${String(size)}`],
        dev &&
          this.context.devMode &&
          process.env.NODE_ENV !== 'production' &&
          devStyles[`colors${String(dev)}`],
        styles.grid,
      ])
      const offsetClasses = compact([
        align && styles[`${align}Align`],
        justify && styles[`${justify}Justify`],
      ])

      if (padding) {
        return (
          <Component {...props} className={classes.join(' ')}>
            <Padding direction={padding} className={offsetClasses.join(' ')}>
              {children}
            </Padding>
          </Component>
        )
      }

      return (
        <Component
          {...props}
          className={[...classes, ...offsetClasses].join(' ')}
        >
          {children}
        </Component>
      )
    }

    static displayName = `withGrid(${getDisplayName(Component)})`
  }
}
