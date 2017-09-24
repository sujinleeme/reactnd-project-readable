/* https://github.com/zeit/next.js/ */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp'
import qs from 'qs';

import {
  Route as ReactRouterRoute,
  Link as ReactRouterLink,
} from 'react-router-dom';

export class Route extends Component {
  
  static displayName = 'PatchedRoute';
  
  static propTypes = {
    location: ReactRouterRoute.propTypes.location,
  }
  
  static contextTypes = {
    router: ReactRouterRoute.contextTypes.router,
  }
  
  render() {
    let location = this.props.location || this.context.router.route.location;
    if (location && location.search && location.search.length > 1) {
      location = { ...location };
      location.query = qs.parse(location.search.substring(1));
    }
    return <ReactRouterRoute {...this.props} location={location} />
  }
}

export class Link extends Component {
  
  static displayName = 'PatchedLink';
  
  static propTypes = {
    path: PropTypes.string, //  Route's path
    params: PropTypes.object,
    query: PropTypes.object,
    hash: PropTypes.string,
  }
  
  render() {
    let to = this.props.to;
    const { path, params, query, hash, ...rest } = this.props;
    if (path) {
      to = getRouteHref(path, params, query, hash)
    }
    return <ReactRouterLink {...rest} to={to} />
  }
}

//  Function to get href
//  Example: getRouteHref('/users/:userId', { userId: '123' }, { referrer: 'ads' }, 'section')
export function getRouteHref(path, params, query, hash) {
  const toPathRegexp = pathToRegexp.compile(path);
  let url;
  try {
    url = toPathRegexp(params);
    if (query) {
      url += '?' + qs.stringify(query);
    }
    if (hash) {
      url += '#' + hash;
    }
  } catch (err) {
    console.warn(err);
    url = '#';
  }
  return url;
}
