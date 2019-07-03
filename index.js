{
  "name": "@holonis/holonis-atoms",
  "version": "0.0.20",
  "description": "",
  "main": "dist/index.js",
  "private": true,
  "scripts": {
    "build-dist": "webpack --config=webpack.config.dist.babel.js",
    "test": "jest --colors",
    "start": "webpack-dev-server --mode development",
    "prepublishOnly": "rm -rf dist && npm run build-dist",
    "build": "webpack --mode development"
  },
  "author": "",
  "license": "ISC",
  "peerDependencies": {
    "react": "^16.3.0",
    "react-dom": "^16.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "@babel/register": "^7.0.0",
    "autoprefixer": "^9.4.7",
    "babel-loader": "8.0.0",
    "css-loader": "^2.1.0",
    "deep-assign": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
    "identity-obj-proxy": "^3.0.0",
    "install": "^0.12.2",
    "jest": "^24.0.0",
    "node-sass": "^4.11.0",
    "npm": "^6.7.0",
    "postcss-loader": "^3.0.0",
    "prop-types": "^15.6.2",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-test-renderer": "^16.7.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "svg-react-loader": "^0.4.6",
    "terser-webpack-plugin": "^1.2.2",
    "unexpected": "^11.0.1",
    "unexpected-react": "^5.0.4",
    "webpack": "^4.29.0",
    "webpack-bundle-size-analyzer": "^3.0.0",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {
    "babel-eslint": "^10.0.2",
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-plugin-import": "^2.17.3",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-react": "^7.13.0"
  }
}
