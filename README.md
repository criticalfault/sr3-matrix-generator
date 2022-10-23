# Shadowrun Matrix Generator (3rd Edition)

This project generates a Matrix Grid that is more appropriate and intuitive than the default generator. It is targeted for the ~~best~~ third edition of Shadowrun.

Not only does it generate a Matrix, it also has tool tips to tell you what each IC does, reducing the amount of flipping through aging books.

## Deployment

This uses Teraform Cloud to hold the state of a [DigitalOcean App](https://www.digitalocean.com/products/app-platform) hosting this as a single page. All in all, a change here will be pushed through Terraform and trigged by DO, removing the need to do anything fancy.

For local development, supposing you don't have access to our Terraform Cloud, you can simply remove this block

```terraform
  cloud {
    organization = "ravegrunt"
    workspaces {
      name = "sr3-matrix-gen"
    }
  }
```

From `terraform/main.tf` and that'll let you run it locally (and won't impact our main state file).

## Contributing

This is based on the React Getting Started app, therefore a few built in scripts below. Also see [Contributing](CONTRIBUTING.md)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
