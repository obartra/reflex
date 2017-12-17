// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import type {
  ConfigProviderContext,
  DisplayAliases,
  SpacingAliases,
} from '../types'
import defaults from '../defaults'

type Props = {
  base?: number,
  children?: React.Node,
  columns?: number,
  displayAliases?: DisplayAliases,
  gutter?: number,
  maxPageWidth?: number,
  minPageWidth?: number,
  pageMargin?: {
    [string]: number,
  },
  spacingAliases?: SpacingAliases,
  verticalGutter?: number,
}

export const ConfigContextPropTypes = {
  xnReflex: PropTypes.shape({
    base: PropTypes.number,
    columns: PropTypes.number,
    displayAliases: PropTypes.shape({}),
    gutter: PropTypes.number,
    maxPageWidth: PropTypes.number,
    minPageWidth: PropTypes.number,
    pageMargin: PropTypes.shape({}),
    spacingAliases: PropTypes.shape({}),
    verticalGutter: PropTypes.number,
  }),
}

export default class ConfigProvider extends React.Component<Props> {
  static contextTypes = ConfigContextPropTypes
  static childContextTypes = ConfigContextPropTypes

  getChildContext(): ConfigProviderContext {
    const {
      gutter = defaults.gutter,
      verticalGutter = gutter,
      ...props
    } = this.props

    return {
      xnReflex: {
        gutter,
        verticalGutter,
        ...props,
      },
    }
  }
  render() {
    return this.props.children || null
  }
}
